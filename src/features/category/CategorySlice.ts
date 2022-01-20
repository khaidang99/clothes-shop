import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Category from "models/Category";

export const fetchAllCategories = createAsyncThunk(
  "category/getAll",
  async () => {
    const response = await Category.getAllCategories();
    return response.data;
  }
);

export const fetchCreateCategory = createAsyncThunk(
  "category/create",
  async (category : string) => {
    const response = await Category.createCategory(category);
    return response.data;
  }
);

export const fetchUpdateCategory = createAsyncThunk(
  "category/update",
  async ({ id, name }: {id: string, name: string}) => {
    console.log(name);
    const response = await Category.updateCategory({ id, name });
    return response.data;
  }
);

export const fetchDeleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string) => {
    const response = await Category.deleteCategory(id);
    return response.data;
  }
);

type TypeInitialState = {
  categories: any[],
  loading: 'pending' | 'idle'
}

const initialState: TypeInitialState = {
  categories: [],
  loading: "pending"
}

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllCategories.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        // Add user to the state array
        if (state.loading === "pending") {
          state.loading = "idle";
          state.categories = action.payload;
        }
      })
      .addCase(fetchCreateCategory.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        // Add user to the state array
        if (state.loading === "pending") {
          console.log(action.payload);
          state.loading = "idle";
          state.categories = action.payload.categories;
        }
      })
      .addCase(fetchUpdateCategory.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        // Add user to the state array
        if (state.loading === "pending") {
          state.loading = "idle";
          state.categories = action.payload.categories;
        }
      })
      .addCase(fetchDeleteCategory.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        // Add user to the state array
        if (state.loading === "pending") {
          state.loading = "idle";
          state.categories = action.payload.categories;
        }
      });
  },
});

export const { setLoading } = categorySlice.actions;

export default categorySlice.reducer;
