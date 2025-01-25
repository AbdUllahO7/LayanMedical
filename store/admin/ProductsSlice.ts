import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Products {
    _id: string;
    title: string;
    description: string;
    category: string[]; // Category IDs
    features: string[];
    listImages: string[];
}

interface ProductsState {
    isLoading: boolean;
    ProductsList: Products[];
    singleProducts: Products | null;
    error: string | null;
}

interface FetchAllProductsParams {
    sort?: string | null;
    search: string;
    page?: number;
    limit?: number;
}

interface CreateOrUpdateProductsParams {
    formData: Record<string, any>;
    selectedCategoryIds: string[]; // Category IDs
}

const initialState: ProductsState = {
    isLoading: true,
    ProductsList: [],
    singleProducts: null,
    error: null,
};

// Async Thunks for ProductsAndService routes
export const fetchAllProducts = createAsyncThunk(
    '/Products/fetchAll',
    async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes`);
        return response.data;
    }
);

export const fetchProductsById = createAsyncThunk(
    '/Products/fetchById',
    async (id: string) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/${id}`);
        return response.data;
    }
);

export const createProducts = createAsyncThunk(
    '/Products/create',
    async ({ formData, selectedCategoryIds }: CreateOrUpdateProductsParams) => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes`,
            {
                ...formData,
                category: selectedCategoryIds,
            },
            { withCredentials: true }
        );
        return response.data;
    }
);

export const updateProducts = createAsyncThunk(
    '/Products/update',
    async ({ id, formData, selectedCategoryIds }: { id: string } & CreateOrUpdateProductsParams) => {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/${id}`,
            {
                ...formData,
                category: selectedCategoryIds,
            },
            { withCredentials: true }
        );
        return response.data;
    }
);

export const deleteProducts = createAsyncThunk(
    '/Products/delete',
    async (id: string) => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/${id}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

const ProductsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setDetails: (state) => {
      state.singleProducts = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.ProductsList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Products by ID
      .addCase(fetchProductsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsById.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.singleProducts = action.payload.data;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Create Products
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.ProductsList.push(action.payload.data);
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Update Products
      .addCase(updateProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.ProductsList = state.ProductsList.map((Products) =>
          Products._id === action.payload.data._id ? action.payload.data : Products
        );
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Delete Products
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductsList = state.ProductsList.filter((Products) => Products._id !== action.meta.arg);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDetails } = ProductsSlice.actions;

export default ProductsSlice.reducer;
