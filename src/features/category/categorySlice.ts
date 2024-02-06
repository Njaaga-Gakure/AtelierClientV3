import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "../../utils/axios";

export type Category = {
  id: string;
  name: string;
  image: string;
};
type CategoryResponse = {
  errorMessage: string;
  count: number;
  categories: Category[];
};

type CategoryState = {
  isLoading: boolean;
  isError: boolean;
  categoriesCount: number;
  categories: Category[];
};

const initialState: CategoryState = {
  isLoading: false,
  isError: false,
  categoriesCount: 0,
  categories: [],
};

export const getAllCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get("/api/category");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.errorMessage || "An Error Occurred :("
        );
      }
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.isLoading = false;
          state.categoriesCount = action.payload.count;
          state.categories = action.payload.categories;
        }
      )
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
