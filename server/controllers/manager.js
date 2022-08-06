const User = require('../models/userSchema')

const createManager = async (req, res) => {
  const manager = await User.create({ ...req.body, role: 'manager' })

  res.status(201).json({ manager })
}

const getAllManagers = async (req, res) => {}

const getManager = async (req, res) => {
  const { id } = req.params
  const manager = await User.findById(id)

  if (!manager) {
    res.status(404).json(`manager with id ${id} does not exit`)
  }
  res.status(200).json({ manager })
}

const updateManager = async (req, res) => {}

const deleteManager = async (req, res) => {}

module.exports = {
  createManager,
  getAllManagers,
  getManager,
  updateManager,
  deleteManager,
}
