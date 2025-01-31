import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Product interface
interface Product {
  _id: string;
  title: string;
  description: string;
  category: { _id: string; title: string; image: string }[];
  features: string[];
  listImages: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Define the initial state interface
interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// API Base URL

// Async thunks
export const fetchAllProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products.");
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, string, { rejectValue: string }>(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product.");
    }
  }
);

export const createProduct = createAsyncThunk<Product, 
  { formData: { title: string; description: string; listImages: string[] }; selectedCategoryIds: string[] }, 
  { rejectValue: string }
>(
  'products/create',
  async ({ formData, selectedCategoryIds }, { rejectWithValue }) => {

    console.log("formData" , formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes`,
        {
          ...formData,
          categories: selectedCategoryIds,
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product.');
    }
  }
);




export const updateProduct = createAsyncThunk<Product, { id: string; data: Partial<Product> }, { rejectValue: string }>(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/${id}`,
        data
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update product.");
    }
  }
);

export const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/${id}`); // Fixed URL
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete product.");
    }
  }
);


// Create the slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products.";
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product.";
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create product.";
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update product.";
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete product.";
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
