const User = require('../models/userSchema')

const createManager = async (req, res) => {
  const manager = await User.create({ ...req.body, role: 'manager' })

  res.status(201).json({ manager })
}

const getAllManagers = async (req, res) => {
  const managers = await User.find({ role: 'manager' }).sort('createdAt')
  res.status(200).json({ allManager: managers })
}

const getManager = async (req, res) => {
  const { id } = req.params
  const manager = await User.findOne({ _id: id, role: 'manager' })

  if (!manager) {
    res.status(404).json(`manager with id: ${id} does not exit`)
  }
  res.status(200).json({ managerDetails: manager })
}

const updateManager = async (req, res) => {
  const { id } = req.params
  const manager = await User.findOneAndUpdate(
    { _id: id, role: 'manager' },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!manager) {
    res.status(404).json(`manager with id: ${id} does not exit`)
  }
  res.status(200).json({ updatedDetails: manager })
}

const deleteManager = async (req, res) => {
  const { id } = req.params
  const manager = await User.findOneAndDelete({ _id: id, role: 'manager' })

  if (!manager) {
    res.status(404).json(`manager with id: ${id} does not exit`)
  }
  res.status(200).json(`manager with id: ${id} deleted`)
}

module.exports = {
  createManager,
  getAllManagers,
  getManager,
  updateManager,
  deleteManager,
}
