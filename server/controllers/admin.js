const User = require('../models/userSchema')

const getAllUsers = async (req, res) => {
  //admin: view all users in all roles
  const users = await User.find({}).sort('createdAt')
  res.status(200).json({ msg: `total number of users: ${users.length}`, users })
}

//admin: view any user details from any role
const getUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  if (!user) {
    res.status(404).json(`user with id: ${id} does not exit`)
  }
  res.status(200).json({ userDetails: user })
}

//admin: update user details from any role
const updateUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findOneAndUpdate({ id }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    res.status(404).json(`user with id: ${id} does not exit`)
  }
  res.status(200).json(`user with id: ${id} updated`)
}

//admin: delete any user from any role
const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findOneAndDelete(id)

  if (!user) {
    res.status(404).json(`user with id: ${id} does not exit`)
  }
  res.status(200).json(`${user.role} with id: ${id} deleted`)
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
}
