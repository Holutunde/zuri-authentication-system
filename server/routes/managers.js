const express = require('express')

const router = express.Router()

const {
  createManager,
  getAllManagers,
  getManager,
  updateManager,
  deleteManager,
} = require('../controllers/manager')

router.route('/').post(createManager).get(getAllManagers)

router.route('/:id').get(getManager).delete(deleteManager).patch(updateManager)

module.exports = router
