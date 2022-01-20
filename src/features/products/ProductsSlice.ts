import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "models/Product";
import { Cart, TypePagination, ValuesFormCreateProductAPI, ValuesFormUpdateProductAPI} from "types";

export const fetchAllProducts = createAsyncThunk(
  "products/getAll",
  async (params: TypePagination) => {
    const response = await Product.getAllProducts(params);
    return response.data;
  }
);

export const fetchCreateProduct = createAsyncThunk(
  "products/create",
  async (product: ValuesFormCreateProductAPI) => {
    const response = await Product.createProduct(product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const response = await Product.deleteProduct(id);
    return response.data;
  }
);

export const getSibar = createAsyncThunk("products/getSibar", async () => {
  const response = await Product.getSibar();
  return response.data;
});

type SliceState = {
  products: Cart[];
  categories: [{value: string, name: string}] | [];
  sizes: [{value: string, name: string}] | [];
  countTotal: number,
  loading: "pending" | "idle";
};

const initialState: SliceState = {
  products: [],
  categories: [],
  sizes: [],
  countTotal: 0,
  loading: "pending",
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(state.loading);
        if (state.loading === "pending") {
          console.log(action.payload);
          state.loading = "idle";
          state.products = action.payload.products;
          state.countTotal = action.payload.countTotal;
        }
      })
      .addCase(fetchCreateProduct.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchCreateProduct.fulfilled, (state, action) => {
        state.products = action.payload.allProduct;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(getSibar.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.sizes = action.payload.sizes;
      });
  },
});

export const { setLoading } = productSlice.actions;

export default productSlice.reducer;
