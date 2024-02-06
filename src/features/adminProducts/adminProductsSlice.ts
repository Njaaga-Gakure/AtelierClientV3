import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "../../utils/axios";
import { RootState } from "../../store/store";

export type AdminProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  sellerId: string;
  category: string;
  status: string;
  startTime: Date;
  endTime: Date;
  startPrice: number;
  currentHighestBid: number;
  bids: number;
};

type AdminProductsResponse = {
  errorMessage: string;
  count: number;
  products: AdminProduct[];
};

type AdminProductState = {
  isLoading: boolean;
  isError: boolean;
  pageNumber: number;
  productCount: number;
  adminProducts: AdminProduct[];
};

const initialState: AdminProductState = {
  isLoading: false,
  isError: false,
  pageNumber: 1,
  productCount: 0,
  adminProducts: [],
};

export const fetchAdminProducts = createAsyncThunk<
  AdminProductsResponse,
  void,
  { state: RootState }
>("products/getAdminProducts", async (_, thunkAPI) => {
  try {
    let url: string = "api/product";
    const { data } = await customAxios.get(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data.errorMessage || "An Error Occurred :("
      );
    }
  }
});

export const adminProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action: PayloadAction<AdminProductsResponse>) => {
          state.isLoading = false;
          state.productCount = action.payload.count;
          state.adminProducts = action.payload.products;
        }
      )
      .addCase(fetchAdminProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
