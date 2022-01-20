import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "features/products/ProductsSlice";
import LoginReducer from "features/login/LoginSlice";
import commonReducer from "features/common/commonSlice";
import categoryReducer from "features/category/CategorySlice";
import sizeApi from "features/size/SizeSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    login: LoginReducer,
    category: categoryReducer,
    common: commonReducer,
    [sizeApi.reducerPath]: sizeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sizeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch