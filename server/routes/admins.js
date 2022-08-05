const express = require('express')

const router = express.Router()

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/admin')

router.route('/').get(getAllUsers)

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

module.exports = router
