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
    const { userId, username, role } = payload
    req.user = { userId: userId, username: username, role: role }
    console.log(req.user.role)

    if (req.user.role != 'staff') {
      next()
    } else if ((req.user.role = 'staff')) {
      next()
    } else if (req.user.role != 'manager') {
      next()
    } else if ((req.user.role = 'manager')) {
      next()
    } else if (req.user.role != 'admin') {
      next()
    }
  } catch (error) {
    res.status(401).json('token not verified')
  }
}

module.exports = { authMid }
