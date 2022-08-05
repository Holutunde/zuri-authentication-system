const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please provide firstname'],
      maxlength: 50,
      minlength: 5,
    },
    lastname: {
      type: String,
      required: [true, 'Please provide secondname'],
      maxlength: 50,
      minlength: 5,
    },
    username: {
      type: String,
      required: [true, 'Please provide username'],
      maxlength: 50,
      minlength: 5,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //validator that check if the value matches the given regular expression
        'Please provide a valid email',
      ],
      unique: true,
      //create a unique index
      //same email will get duplicate error
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 5,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'staff', 'manager'],
      default: 'user',
    },
  },
  { timestamps: true },
)

//mongoose middleware
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//generate token function with the schema instance method
UserSchema.methods.createWebToken = function () {
  return jwt.sign(
    { userId: this._id, username: this.name, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  )
}

//confirm password function
UserSchema.methods.confirmPassword = async function (accessPassword) {
  const isMatch = await bcrypt.compare(accessPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
