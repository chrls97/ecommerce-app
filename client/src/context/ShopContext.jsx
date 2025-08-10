import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create and export a new context called ShopContext This will be used to share data across components
export const ShopContext = createContext();

// Define a context provider component that will wrap other components and provide them access to the shared data
const ShopContextProvider = (props) => {
    
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Initialize cartItems state as an empty object using React's useState
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();


  // Define an async function to add items to the cart
  const addToCart = async (productId, productSize) => {

    if(!productSize){
      toast.error('Select Product Size'); 
      return;
    }
    
    // Create a deep copy of the current cartItems state using structuredClone
    // This ensures we don't mutate the original state directly
    let cartData = structuredClone(cartItems);

    // Check if the product already exists in the cart
    if(cartData[productId]){
      // If product exists, check if the specific size exists for this product
      if(cartData[productId][productSize]){
        // If size exists, increment the quantity by 1
        cartData[productId][productSize] += 1;
      }else{
        // If size doesn't exist, initialize it with quantity 1
        cartData[productId][productSize] = 1;
      }
    }else{
      // If product doesn't exist in cart at all:
      // 1. Create an empty object for this productId
      cartData[productId] = {};
      // 2. Initialize the selected size with quantity 1
      cartData[productId][productSize] = 1;
    }

    toast.success('Product sucessfully added to your cart'); 
    // Update the state with the modified cart data
    setCartItems(cartData)
  }


  // show total products/item on cart
  const getCartCount = () => {
    let totalCount = 0;

    // First loop: Iterate over each category (or group) in the cartItems object
    // 'items' will represent each key in the cartItems object (e.g., 'electronics', 'clothing')
    for(const productId in cartItems){
      // Second loop: Iterate over each individual item within the current category
      // 'item' will represent each key within the nested object (e.g., 'laptop', 'shirt')
      for(const productSize in cartItems[productId]){
        // Use try-catch to handle any potential errors that might occur
        try{
          // Check if the quantity of the current item is greater than 0
          if(cartItems[productId][productSize] > 0){
            // If it is, add the quantity to the total count
            totalCount += cartItems[productId][productSize]
          }
        }catch(error){

        } 
      }
    }
    
    // Return the final calculated total count of all items in the cart
    return totalCount;
  }

  // update cart quantity
  const updateCartQty = async (productId, productSize, productQty) => {
    let cartData = structuredClone(cartItems)

    cartData[productId][productSize] = productQty;

    setCartItems(cartData)
  }


  // get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    
    for(const productId in cartItems){
      // find the price of product by looking in the productdata
      // productInfo = passing the value/data of the product
      let productInfo = products.find((product) => product._id === productId)
      
      for(const productSize in cartItems[productId]){
        try{
          totalAmount += productInfo.price * cartItems[productId][productSize];
        }catch{

        }
      }
    }

    return totalAmount;
  }

  // useEffect(() => {
  //   console.log(cartItems)
  // },[cartItems])

  






  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateCartQty,getCartAmount,navigate
  }


  // Return the Provider component with the value we want to share
  // The Provider will wrap its children (passed via props.children) making the value available to them
  return(
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )

}

// Export the ShopContextProvider component as the default export
export default ShopContextProvider;