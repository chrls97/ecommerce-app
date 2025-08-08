import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

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


  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try{
          if(cartItems[items][item] > 0){
            totalCount += cartItems[items][item]
          }
        }catch(error){

        } 
      }
    }
    
    return totalCount;
  }






  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount
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