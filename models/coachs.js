const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const coachSchema = Schema({
  user: { type: ObjectId, ref: 'User' },
  bio: { type: String, default: 'Politvalant coach.' },
  discipline: { type: String, default: 'Multi sports' },
  slots: [{ type: ObjectId, ref: 'Slot' }]
})

module.exports = mongoose.model('Coach', coachSchema)
