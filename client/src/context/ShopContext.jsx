import { createContext } from "react";
import { products } from "../assets/assets";

// Create and export a new context called ShopContext This will be used to share data across components
export const ShopContext = createContext();

// Define a context provider component that will wrap other components and provide them access to the shared data
const ShopContextProvider = (props) => {
    
  const currency = '$';
  const delivery_fee = 10;

  const value = {
    products, currency, delivery_fee
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