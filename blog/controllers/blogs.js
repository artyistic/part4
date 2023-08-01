const blogsRouter = require("express").Router()

const Blog = require("../models/blog.js")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const newBlog = new Blog({
    ...body,
    likes: body.likes || 0,
  })
  const addedBlog = await newBlog.save()
  response.status(201).json(addedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
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
