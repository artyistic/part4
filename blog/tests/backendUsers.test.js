const User = require("../models/user")
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt")
const helper = require("./backendTestHelper")

// this block is straight from full stack open 
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("get all users", async () => {
    const usersAtStart = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(usersAtStart.body).toHaveLength(1)
    expect(usersAtStart.body.map(user => user.username)).toContain("root")
    
  })

  test("invalid user creation", async () => {
    const usersAtStart = await helper.usersInDb()

    // test cases for bad user creation
    const shortPw = {
      username: "shortPw",
      name: "shortPw",
      password: "12"
    }

    const missingUsername = {
      name: "noUsername",
      password: "longEnoughPw"
    }

    const missingPw = {
      username: "missingPw",
      name: "missingPw"      
    }
    await api
      .post("/api/users")
      .send(shortPw)
      .expect(400)

    await api
      .post("/api/users")
      .send(missingUsername)
      .expect(400)

    await api
      .post("/api/users")
      .send(missingPw)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()

      //verify that the users database is not changed at all
      expect(usersAtStart).toEqual(usersAtEnd)

    
  })
})