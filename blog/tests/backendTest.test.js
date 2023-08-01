const mongoose = require("mongoose");
const testBlogs = require("./testBlogs");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./backendTestHelper")
const one = testBlogs.listWithOneBlog.array;
const more = testBlogs.listWithMoreBlog.array;

beforeEach(async () => {
  await Blog.deleteMany({});
  const promises = more.map((blog) => new Blog(blog).save());
  await Promise.all(promises);
});

test("testing get route", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const contents = res.body
  expect(contents).toHaveLength(more.length)
});

test("testing existence of id attribute", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const contents = res.body
  expect(contents[0].id).toBeDefined()
})

test("testing post route", async () => {
  const newBlog = {
      title: "test",
      author: "author test",
      url: "testurl",
      likes: 0
  }
  const before = await helper.blogsInDb()

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await helper.blogsInDb()
  
  expect(before.length).toBe(after.length - 1)
  const urls = after.map(blog => blog.url)
  expect(urls).toContain(newBlog.url)
})

test("testing missing likes attribute for post", async () => {
  const newBlog = {
      title: "test",
      author: "author test",
      url: "testurl"
  }
  const before = await helper.blogsInDb()

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await helper.blogsInDb()
  
  expect(before.length).toBe(after.length - 1)
  expect(after.filter(blog => blog.title === "test")[0].likes).toBe(0)
})


test("testing missing url and title attributes for post", async () => {
  const missingTitle = {
      author: "author test",
      url: "testurl"
  }

  const missingURL = {
    title: "test",
    author: "author test"
}
  const before = await helper.blogsInDb()

  await api
    .post("/api/blogs")
    .send(missingTitle)
    .expect(400)

  const afterTitle = await helper.blogsInDb()
  expect(afterTitle).toEqual(before)

    await api
    .post("/api/blogs")
    .send(missingURL)
    .expect(400)

  const afterURL = await helper.blogsInDb()
  expect(afterURL).toEqual(before)
  
    
})