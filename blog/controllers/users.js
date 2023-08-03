const bcrypt = require("bcrypt")
const User = require("../models/user")
const userRouter = require("express").Router()


userRouter.get("/", async (request, response) => {
  const savedUser = await User.find({}).populate("blogs")
  response.json(savedUser)
})

userRouter.post("/", async (request, response) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({ error: "password missing" })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: "password must be longer than three chars" })
  }
  const saltRounds = 10
  const hashed = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    ...body,
    passwordHash: hashed,
    blogs: []
  })

  
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = userRouter