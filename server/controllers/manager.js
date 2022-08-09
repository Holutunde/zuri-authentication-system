const User = require('../models/userSchema')

//manager: show all managers available
const getAllManagers = async (req, res) => {
  const managers = await User.find({ role: 'manager' }).sort('createdAt')
  res
    .status(200)
    .json({ msg: `total number of managers: ${managers.length}`, managers })
}

//manager: view a manager details
const getManager = async (req, res) => {
  const { id } = req.params
  const manager = await User.findOne({ _id: id, role: 'manager' })

  if (!manager) {
    res.status(404).json(`manager with id: ${id} does not exit`)
  }
  res.status(200).json({ managerDetails: manager })
}

//mamager: update a manager details
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
  res.status(200).json(`manager with id: ${id} updated`)
}
//manager: delete any manager from all managers
const deleteManager = async (req, res) => {
  const { id } = req.params
  const manager = await User.findOneAndDelete({ _id: id, role: 'manager' })

  if (!manager) {
    res.status(404).json(`manager with id: ${id} does not exit`)
  }
  res.status(200).json(`manager with id: ${id} deleted`)
}

module.exports = {
  getAllManagers,
  getManager,
  updateManager,
  deleteManager,
}
