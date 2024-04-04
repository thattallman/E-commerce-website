import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartArray: [],
  },
  reducers: {
    pushData: (state, action) => {
      const newData = action.payload;
      const existingProductIndex = state.cartArray.findIndex(
        (product) => product.id === newData.id
      );

      if (existingProductIndex === -1) {
        return {
          ...state,
          cartArray: [...state.cartArray, { ...newData, quantity: 1 }],
        };
      } else {
        return {
          ...state,
          cartArray: state.cartArray.map((product, index) =>
            index === existingProductIndex
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }
    },

    deleteProduct: (state, action) => {
      const productId = action.payload;
      return {
        ...state,
        cartArray: state.cartArray.filter(
          (product) => product.id !== productId
        ),
      };
    },
  },
});

export const { pushData, decreaseQuantity, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
