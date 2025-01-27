import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Category type
interface Category {
    _id: string;
    title: string;
    image?: string;
}

// Define the initial state structure
interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
};



// Async thunk for fetching all categories
export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}Categories/getAllCategories`);
        return response.data.data; // Assuming the data is in the `data` field of the response
        } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

// Async thunk for creating a category
export const createCategory = createAsyncThunk<Category, { title: string; image?: string }>(
    'categories/createCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}Categories/createCategory`, categoryData);
        return response.data.data; // Assuming the data is in the `data` field of the response
        } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create category');
        }
    }
);

// Async thunk for updating a category
export const updateCategory = createAsyncThunk<
    Category,
    { id: string; title: string; image?: string }
    >(
    'categories/updateCategory',
    async ({ id, title, image }, { rejectWithValue }) => {
        try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}Categories/updateCategory/${id}`, { title, image });
        return response.data.data; // Assuming the data is in the `data` field of the response
        } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }
    }
);

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk<string, string>(
    'categories/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}Categories/deleteCategory/${id}`);
        return id; // Return the ID of the deleted category
        } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

// Create the categories slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Handle fetchCategories
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Handle createCategory
        .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        // Handle updateCategory
        .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
            if (index !== -1) {
            state.categories[index] = action.payload;
            }
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        // Handle deleteCategory
        .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((cat) => cat._id !== action.payload);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export default categoriesSlice.reducer;
