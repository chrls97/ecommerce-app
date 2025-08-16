import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// Create and export a new context called ShopContext This will be used to share data across components

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

// Define a context provider component that will wrap other components and provide them access to the shared data
const ShopContextProvider = (props) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState('')
  const [products, setProducts] = useState([]);
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  

  // Initialize cartItems state as an empty object using React's useState
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();


  const getUserCartItems = async (token) =>{
    try{
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const getProducts = async() => {
    try{
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
        console.log(response.data.message)
      }
      
    }catch(error){
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(()=>{
    getProducts();
  },[])

 

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

   
    // Update the state with the modified cart data

     setCartItems(cartData)

    if(token){
      try{
        const response = await axios.post(backendUrl + '/api/cart/add',{productId, productSize}, {headers:{token}})
        if(response.data.success){
          toast.success('Product sucessfully added to your cart'); 
         
        }else{
          toast.error(response.data.message)
        }
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }else{
      toast.warning("log in first")
    }
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
          console.log(error)
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

    if(token){
      try{
        if(productQty === 0){
          // update this later in server to delete all cart with 0 quantity
          //await axios.post(backendUrl + '/api/cart/delete', {productId, productSize, productQty}, {headers:{token}})
        }else{
          await axios.post(backendUrl + '/api/cart/update', {productId, productSize, productQty}, {headers:{token}})
        }
        
      }catch(error){
        console.log(error);
        toast.error(error.message)
      }

    }else{
      toast.error("Log in First")
    }
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
        }catch(error){
          console.log(error)
        }
      }
    }

    return totalAmount;
  }

  
   //check token is available or not for login page
  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      //insert the existing token to token variable
      setToken(localStorage.getItem('token'))
      getUserCartItems(localStorage.getItem('token'));
    }else{
      setToken(token)
      getUserCartItems(token);
    } 
  },[token])

  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
    cartItems, setCartItems, addToCart, getCartCount, updateCartQty,getCartAmount,navigate, backendUrl,
    token, setToken
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