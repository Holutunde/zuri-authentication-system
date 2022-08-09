const express = require('express')

const router = express.Router()

//user fast route to access details
const { details } = require('../controllers/user')

router.route('/details/:id').get(details)

module.exports = router
