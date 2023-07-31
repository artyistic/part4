const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger.js")
const config = require("./utils/config.js")
const Blog = require("./models/blog.js")
const mongoose = require("mongoose")
const middleware = require("./utils/middleware.js")
const blogsRouter = require("./controllers/blogs.js")
mongoose.set('strictQuery', false)

logger.info('connecting to mongoDB')

mongoose.connect(config.MONGODB_PW)
  .then(() => {
    logger.info("connection to mongoDB completed")
  })
  .catch((error) => {
    logger.error("connection to mongoDB failed", error.message)
  })  

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use(middleware.unknownEndpoint)

module.exports = app
