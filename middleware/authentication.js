const jwt = require('jsonwebtoken')

const authMid = async (req, res, next) => {
  // check authHeader
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json('authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name, role } = payload
    req.user = { userId: userId, name: name, role: role }
    next()
  } catch (error) {
    res.status(401).json('token not verified')
  }
}

const staffMid = async (req, res, next) => {
  // check authHeader
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json('authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name, role } = payload
    req.user = { userId: userId, name: name, role: role }
    //both staff and manager(for recruitment) access to staff authorization
    if (req.user.role != 'staff' && req.user.role != 'manager') {
      return res.status(401).send('you are not eligible to access this route')
    }
    next()
  } catch (error) {
    res.status(401).json('token not verified')
  }
}
const managerMid = async (req, res, next) => {
  // check authHeader
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json('authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name, role } = payload
    req.user = { userId: userId, name: name, role: role }
    //manager access to manager authorization
    if (req.user.role != 'manager') {
      return res.status(401).send('you are not eligible to access this route')
    }
    next()
  } catch (error) {
    res.status(401).json('token not verified')
  }
}
const adminMid = async (req, res, next) => {
  // check authHeader
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json('authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name, role } = payload
    req.user = { userId: userId, name: name, role: role }
    //admin access to admin authorization
    if ((req.user.role = 'admin')) {
      next()
    }
  } catch (error) {
    res.status(401).json('you are not eligible to access this route')
  }
}

module.exports = { authMid, staffMid, managerMid, adminMid }
