const mongoose = require('mongoose')
const { Schema } = mongoose

const subscribtionSchema = Schema({
  startAt: { type: Date, require: true },
  endAt: { type: Date, require: true },
  amountPaid: { type: Number, require: true },
  paymentMode: { type: String, default: 'credit-cart' },
})

module.exports = mongoose.model('Subscribtion', subscribtionSchema)
