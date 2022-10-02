const mongoose = require('mongoose')
const Schema = mongoose.Schema

const room = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },

    size: {
      type: Number
    },

    language: {
      type: String
    }
  },
  { timestamps: true }
)
const Room = mongoose.model('room', room)

module.exports = Room
