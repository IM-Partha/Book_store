import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";
import searchReducer from "./searchSlice";
const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
         search: searchReducer
    },
  });
  
  export default store;