const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password_hash: {
      type: String,
      required: true
    },
    name: {
      type: String
    }
  },
  { timestamps: true }
)
const User = mongoose.model('user', user)

module.exports = User
