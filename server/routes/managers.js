const express = require('express')

const router = express.Router()

const {
  getAllManagers,
  getManager,
  updateManager,
  deleteManager,
} = require('../controllers/manager')

router.route('/').get(getAllManagers)

router.route('/:id').get(getManager).delete(deleteManager).patch(updateManager)

module.exports = router
