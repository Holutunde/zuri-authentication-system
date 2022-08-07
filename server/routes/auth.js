const express = require('express')
const router = express.Router()
const {
  register,
  login,
  forgotPassword,
  changePassword,
} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.post('/changepassword', changePassword)

module.exports = router
