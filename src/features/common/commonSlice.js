import { createSlice } from "@reduxjs/toolkit";

const getQuantitySessionCart = () => {
  return JSON.parse(window.sessionStorage.getItem("cart"))
    ? JSON.parse(window.sessionStorage.getItem("cart")).length
    : 0;
};

const commonSlice = createSlice({
  name: "common",
  initialState: {
    loading: false,
    quantityCart: getQuantitySessionCart(),
  },
  reducers: {
    setLoadingFullPage(state, action) {
      state.loading = action.payload;
    },
    
    setQuantityCart(state, action) {
      state.quantityCart = getQuantitySessionCart();
    }
  }
});

export const { setLoadingFullPage, setQuantityCart } = commonSlice.actions;
export default commonSlice.reducer;
