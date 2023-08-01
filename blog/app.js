const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger.js")
const config = require("./utils/config.js")
const mongoose = require("mongoose")
require('express-async-errors')
const blogsRouter = require("./controllers/blogs.js")
const middleware = require("./utils/middleware.js")
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
app.use(middleware.errorHandler)
module.exports = app
