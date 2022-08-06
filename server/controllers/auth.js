const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body })
  const newToken = newUser.createWebToken()
  res.status(200).json({ user: { name: newUser.username }, newToken })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json('Please provide email and password')
  }
  const getUser = await User.findOne({ email })
  if (!getUser) {
    return res.status(401).json('Invalid Credentials')
  }

  const samePassword = await getUser.confirmPassword(password)
  if (!samePassword) {
    return res.status(401).json('Invalid Credentials')
  }

  const userToken = getUser.createWebToken()
  res.status(200).json({
    user: `username: ${getUser.username} has logged in`,
    userToken,
  })
}

module.exports = {
  register,
  login,
}
