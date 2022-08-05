require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./database/db')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

// routes
const admins = require('./server/routes/admins')
const auth = require('./server/routes/auth')

app.use(express.json())

app.use('/auth/admin', admins)
app.use('/auth', auth)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
