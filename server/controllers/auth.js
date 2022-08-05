const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body })
  const newToken = newUser.createWebToken()
  res.status(200).json({ user: { name: newUser.username }, newToken })
}

const login = async (req, res) => {}

module.exports = {
  register,
  login,
}
