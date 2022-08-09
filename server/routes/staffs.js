const express = require('express')

const router = express.Router()

const {
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staff')

router.route('/').get(getAllStaffs)

router.route('/:id').get(getStaff).delete(deleteStaff).patch(updateStaff)

module.exports = router
