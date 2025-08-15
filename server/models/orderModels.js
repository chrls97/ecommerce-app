import mongoose from 'mongoose'

const orderScheme = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: 'Order Placed' },
  paymentMethod: { type: String, required: true },
  //if paymet is online payment is true
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderScheme)
export default orderModel;