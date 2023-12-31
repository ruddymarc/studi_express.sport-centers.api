const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ 
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  dateOfBirth: { type: Date, require: true },
  token: { type: String, require: true },
  salt: { type: String, require: true },
  hash: { type: String, require: true },
  role: { type: String, default: 'customer' },
})

module.exports = mongoose.model('User', userSchema)
