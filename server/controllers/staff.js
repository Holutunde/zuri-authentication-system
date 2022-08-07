const User = require('../models/userSchema')

const createStaff = async (req, res) => {
  const staff = await User.create({ ...req.body, role: 'staff' })

  res.status(201).json({ staff })
}

const getAllStaffs = async (req, res) => {
  const staffs = await User.find({})
  res.status(200).json({ allStaffs: staffs })
}

const getStaff = async (req, res) => {
  const { id } = req.params
  const staff = await User.findOne({ _id: id, role: 'staff' })

  if (!staff) {
    res.status(404).json(`staff with id: ${id} does not exit`)
  }
  res.status(200).json({ staffDetails: staff })
}

const updateStaff = async (req, res) => {
  const { id } = req.params
  const staff = await User.findOneAndUpdate(
    { _id: id, role: 'staff' },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!staff) {
    res.status(404).json(`staff with id: ${id} does not exit`)
  }
  res.status(200).json({ updatedDetails: staff })
}

const deleteStaff = async (req, res) => {
  const { id } = req.params
  const staff = await User.findOneAndDelete({ _id: id, role: 'staff' })

  if (!staff) {
    res.status(404).json(`staff with id: ${id} does not exit`)
  }
  res.status(200).json(`staff with id: ${id} deleted`)
}

module.exports = {
  createStaff,
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
}
