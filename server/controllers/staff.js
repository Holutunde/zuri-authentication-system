const User = require('../models/userSchema')

//staff: show all staffs
const getAllStaffs = async (req, res) => {
  const staffs = await User.find({ role: 'staff' }).sort('createdAt')
  res
    .status(200)
    .json({ msg: `total number of staffs: ${staffs.length}`, staffs })
}

//staff: view a particular staff details
const getStaff = async (req, res) => {
  const { id } = req.params
  const staff = await User.findOne({ _id: id, role: 'staff' })

  if (!staff) {
    res.status(404).json(`staff with id: ${id} does not exit`)
  }
  res.status(200).json({ staffDetails: staff })
}

//staff: update a staff details
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
  res.status(200).json(`staff with id: ${id} updated`)
}

//staff: delete any staff from all staffs
const deleteStaff = async (req, res) => {
  const { id } = req.params
  const staff = await User.findOneAndDelete({ _id: id, role: 'staff' })

  if (!staff) {
    res.status(404).json(`staff with id: ${id} does not exit`)
  }
  res.status(200).json(`staff with id: ${id} deleted`)
}

module.exports = {
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
}
