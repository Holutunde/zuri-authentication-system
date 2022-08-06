const User = require('../models/userSchema')

const createStaff = async (req, res) => {
  const staff = await User.create({ ...req.body, role: 'staff' })

  res.status(201).json(`${staff.username} is added as the new staff`)
}

const getAllStaffs = async (req, res) => {
  const staffs = await User.find({})
  res.status(200).json(`there are ${staffs.length} staff in the company`)
}

const getStaff = async (req, res) => {
  const { id } = req.params
  const staff = await User.findOne({ _id: id, role: 'staff' })

  if (!staff) {
    res.status(404).json(`manager with id ${id} does not exit`)
  }
  res.status(200).json({ staffDetails: staff })
}

const updateStaff = async (req, res) => {}

const deleteStaff = async (req, res) => {}

module.exports = {
  createStaff,
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
}
