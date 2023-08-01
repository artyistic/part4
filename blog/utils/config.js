require('dotenv').config()

const MONGODB_PW = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_PW
  : process.env.MONGODB_PW
const PORT = process.env.PORT

module.exports = {MONGODB_PW, PORT}