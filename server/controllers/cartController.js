import userModel from "../models/userModels.js"


// add product to user cart
const addToCart = async (req, res) => {

  try{

    const {userId, productId, productSize} = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData


    if(cartData[productId]){
      if(cartData[productId][productSize]){
        cartData[productId][productSize] += 1;
      }else{
        cartData[productId][productSize] = 1;
      }
    }else{
      cartData[productId] = {}
      cartData[productId][productSize] = 1
    }

    await userModel.findByIdAndUpdate(userId, {cartData})

    res.json({success:true, message:"Product Added to Cart"})

  }catch(error){
    console.log(error)
    res.json({success:false, message:error})
  }

}

// update product to user cart
const updateCart = async (req, res) => {
  try{
    const {userId, productId, productSize, productQty} = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    cartData[productId][productSize] = productQty

    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({success:true, message:"Product Cart Successfully Updated"})

  }catch(error){
    console.log(error);
    res.json({success:false, message:error})
  }
}

// get user cart data
const getUserCart = async (req, res) => {
  try{

    const { userId } = req.body

    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    res.json({success:true, cartData})

  }catch(error){
    console.log(error);
    res.json({success:false, message:error})
    
  }
}

export { addToCart, updateCart, getUserCart }