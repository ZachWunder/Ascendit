const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  type: String,
  price: Number,
  opened: { type: Date, default: Date.now() },
  closed: Date,

})

const Order = mongoose.model('Order', orderSchema)

export Order
