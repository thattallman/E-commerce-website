import { configureStore } from "@reduxjs/toolkit";
import cartData from "./cartData";

const store = configureStore({
  reducer: {
    cart: cartData,
  },
});

export default store;
