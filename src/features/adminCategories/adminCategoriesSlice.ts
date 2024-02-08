import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "../../utils/axios";
import { toast } from "react-toastify";

export type Category = {
  id: string;
  name: string;
  image: string;
};
export type CategoryRequest = {
  name: string;
  image: string;
};
type AddCategoryResponse = {
  errorMessage: string;
  result: string;
};

type CategoryResponse = {
  errorMessage: string;
  count: number;
  categories: Category[];
};

type CategoryState = {
  isLoading: boolean;
  isError: boolean;
  adminCategoriesCount: number;
  adminCategories: Category[];
};

const initialState: CategoryState = {
  isLoading: false,
  isError: false,
  adminCategoriesCount: 0,
  adminCategories: [],
};

export const getAdminCategories = createAsyncThunk(
  "category/getAdminCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get(
        "https://ateliercategoryservice.azurewebsites.net/api/category"
      );
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
export const addCategory = createAsyncThunk(
  "category/addCategories",
  async (categoryRequest: CategoryRequest, thunkAPI) => {
    try {
      const { data } = await customAxios.post(
        "https://ateliercategoryservice.azurewebsites.net/api/category",
        categoryRequest
      );
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

export const adminCategoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getAdminCategories.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.isLoading = false;
          state.adminCategoriesCount = action.payload.count;
          state.adminCategories = action.payload.categories;
        }
      )
      .addCase(getAdminCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<AddCategoryResponse>) => {
          state.isLoading = false;
          toast.success(action.payload.result);
        }
      )
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.success(
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong... :("
        );
      });
  },
});
