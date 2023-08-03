const jwt = require("jsonwebtoken")
const logger = require("./logger")
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "")
    request.token = token
  }
  //console.log("request.token:", request.token)
  next()
}

const userExtractor = async (request, response, next) =>{
  
  if(request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    else{
      request.user = decodedToken.id
    }
  }
  next()
}
module.exports = {unknownEndpoint, errorHandler, tokenExtractor, userExtractor}