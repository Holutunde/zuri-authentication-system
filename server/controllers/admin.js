const User = require('../models/userSchema')

const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort('createdAt')
  res.status(200).json({ allUser: users })
}

const getUser = async (req, res) => {}

const updateUser = async (req, res) => {}

const deleteUser = async (req, res) => {}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
}
