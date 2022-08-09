const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body })
  const newToken = newUser.createWebToken()
  res.cookie('jwt', newToken, { httpOnly: true, maxAge: maxAge * 10000 })
  res
    .status(200)
    .json({ user: `username: ${newUser.username} has registered`, newToken })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json('Please provide email and password')
  }
  const getUser = await User.findOne({ email })
  if (!getUser) {
    return res.status(401).json('invalid email')
  }

  const samePassword = await getUser.confirmPassword(password)
  if (!samePassword) {
    return res.status(401).json('invalid password')
  }

  const userToken = getUser.createWebToken()

  res.status(200).json({
    user: `username: ${getUser.username} has logged in`,
    userToken,
  })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json(`user with this ${user} not found`)
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  if (!token) {
    return res.status(401).json('token cannot be verified')
  }
  res.status(200).json(token)
}

const changePassword = async (req, res) => {
  const { newpassword, confirmpassword, token } = req.body

  try {
    if (newpassword != confirmpassword) {
      return res.status(400).json('both passwords are not the same')
    }
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    console.log(email)
    const user = await User.findOne({ email })
    user.password = newpassword
    user.save()
    res.status(200).send('password changed')
  } catch (err) {
    return res.status(401).json('invalid Token')
  }
}

const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 100 })
  res.status(200).json('successfuly logged out')
}

module.exports = {
  register,
  login,
  forgotPassword,
  changePassword,
  logout,
}
