const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()
const User = require("../models/user.js")
const Blog = require("../models/blog.js")
const blog = require("../models/blog.js")



blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user")
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const userId = request.user

  if (!userId) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(userId)
  const newBlog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id
  })
  const addedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()
  response.status(201).json(addedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  // delete the referenced blog in user database
  const blogToBeDeleted = await Blog.findById(request.params.id)

  const userId = request.user

  if (!userId) {
    return response.status(401).json({ error: "token invalid" })
  }

  if (userId.toString() !== blogToBeDeleted.user.toString()){
    return response.status(401).json({ error: "blogs can only be deleted by the user that created it" })
  }

  const user = await User.findById(blogToBeDeleted.user)  
  user.blogs = user.blogs.filter(createdBlog => createdBlog.toString() !== request.params.id.toString())
  await user.save()
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  try{
    const body = request.body
    const blog = new Blog({
      ...body,
      likes: body.likes || 0,
    })
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  }catch(error){
    console.log(error.message)
  }
})

module.exports = blogsRouter
