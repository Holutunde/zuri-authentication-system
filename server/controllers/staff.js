const User = require('../models/userSchema')

const createStaff = async (req, res) => {
  const staff = await User.create({ ...req.body, role: 'staff' })

  res.status(201).json(`${staff.username} is added as the new staff`)
}

const getAllStaffs = async (req, res) => {}

const getStaff = async (req, res) => {}

const updateStaff = async (req, res) => {}

const deleteStaff = async (req, res) => {}

module.exports = {
  createStaff,
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
}
