const User = require('../models/userSchema')

//user: any user can use to get or access details
const details = async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({ _id: id })

  res.status(200).json({ userDetails: user })
}

module.exports = { details }
