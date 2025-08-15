import express from 'express'
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js'
import authUsers from '../middleware/auth.js';

const cartRouter = express.Router();


cartRouter.post('/get', authUsers, getUserCart)
cartRouter.post('/add', authUsers, addToCart)
cartRouter.post('/update', authUsers, updateCart)

export default cartRouter