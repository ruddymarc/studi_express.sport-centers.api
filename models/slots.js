const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const slotSchema = Schema({
  date: { type: Date, require: true },
  startHour: { type: Number, default: 360 },
  duration: { type: Number, default: 60 },
  label: { type: String, require: true },
  peopleLimit: { type: Number, require: true },
  coach: { type: ObjectId, ref: 'Coach' },
  customers: [{ type: ObjectId, ref: 'Customer' }]
})

module.exports = mongoose.model('Slot', slotSchema)
