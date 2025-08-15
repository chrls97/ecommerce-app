import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUsers from '../middleware/auth.js'

const orderRouter = express.Router();

// Admin features routes
orderRouter.post('list', adminAuth, allOrders)
orderRouter.post('update', adminAuth, updateStatus)

// Payment features
orderRouter.post('/place', authUsers, placeOrder)
orderRouter.post('/stripe', authUsers, placeOrderStripe)
orderRouter.post('/razorpay', authUsers, placeOrderRazorpay)

//User features
orderRouter.post('/userorders', authUsers, userOrders)

export default orderRouter
