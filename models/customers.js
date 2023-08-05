const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const customerSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  level: { type: String, default: 'beginner' },
  subscribtions: [{ type: ObjectId, ref: 'Subscribtion' }],
  slots: []
})

module.exports = mongoose.model('Customer', customerSchema)
