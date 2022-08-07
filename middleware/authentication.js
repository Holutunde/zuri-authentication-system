const User = require('../server/models/UserSchema')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  // check authHeader
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name, role } = payload
    req.user = { userId: userId, name: name, role: role }
    if (req.user.role != 'admin') {
      return res.status(401).send('you do not have access to this user')
    }
    if (req.user.role != 'manager') {
      return res.status(401).send('you do not have access to this user')
    }
    if (req.user.role != 'staff') {
      return res.status(401).send('you do not have access to this user')
    }
    next()
  } catch (error) {
    res.status(401).json('token not verified')
  }
}

module.exports = auth
