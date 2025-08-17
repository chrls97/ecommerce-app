import orderModel from '../models/orderModels.js'
import userModel from '../models/userModels.js'

//Placing Order
const placeOrder = async (req,res) => {

  try{
    
    const {userId, items, amount, address} = req.body

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod:"COD",
      payment:false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    // update the user cart to empty object
    await userModel.findByIdAndUpdate(userId, {cartData:{}})

    res.json({success:true, message:"Order sucessfully placed"})

  }catch(error){
    console.log(error);
    res.json({success:false, message:error.message})    
  }
  
}

//Placing Order using stripe
const placeOrderStripe = async (req,res) => {
  
}

//Placing Order using razorpay
const placeOrderRazorpay= async (req,res) => {
  
}

//Display all orders for admin panel
const allOrders = async (req,res) => {
  
  try{
    const orders = await orderModel.find({})
    res.json({success:true, orders})
    
  }catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
    
  }

}

//Display all orders for user
const userOrders = async (req,res) => {
  try{
    const {userId} = req.body

    const orders = await orderModel.find({userId})
    res.json({success:true, orders})
  }catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
    
  }
}

//update order status
const updateStatus = async (req,res) => {
  
  try{
    
    const {orderId, status} = req.body

    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({success:true,message:'Status successfully updated'})

  }catch (error){
    console.log(error)
    res.json({success:false, message:error.message})
  }

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}