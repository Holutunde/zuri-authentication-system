require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./database/db')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const {
  staffMid,
  adminMid,
  managerMid,
} = require('./middleware/authentication')

// routes
const admins = require('./server/routes/admins')
const auth = require('./server/routes/auth')
const manager = require('./server/routes/managers')
const staff = require('./server/routes/staffs')
const profile = require('./server/routes/users')

app.use(express.json())

app.use('/auth/admin', adminMid, admins)
app.use('/auth', auth)
app.use('/auth/manager', managerMid, manager)
app.use('/auth/staff', staffMid, staff)
app.use('/user',profile)

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
