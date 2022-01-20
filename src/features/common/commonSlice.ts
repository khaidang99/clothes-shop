import { createSlice } from "@reduxjs/toolkit";

const getQuantitySessionCart = () : number => {
  return window.sessionStorage.getItem("cart") && window.sessionStorage.getItem("cart") !== null
    ? JSON.parse(window.sessionStorage.getItem("cart") as string).length
    : 0;
};

type SliceState = { loading: boolean,  quantityCart: number };
const initialState: SliceState = { loading: false, quantityCart: getQuantitySessionCart() }


const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoadingFullPage(state, action) {
      state.loading = action.payload;
    },
    
    setQuantityCart(state) {
      state.quantityCart = getQuantitySessionCart();
    }
  }
});

export const { setLoadingFullPage, setQuantityCart } = commonSlice.actions;
export default commonSlice.reducer;
