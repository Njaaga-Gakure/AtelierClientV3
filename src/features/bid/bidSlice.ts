import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import customAxios from "../../utils/axios";
import axios from "axios";
import { toast } from "react-toastify";

type BidRequest = {
  productId: string;
  bidAmount: number;
};
type placeBidResponse = {
  errorMessage: string;
  result: string;
};
type Bid = {
  id: string;
  bidderId: string;
  bidAmount: number;
  productId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  status: string;
  currentHighestBid: number;
};
type bidsResponse = {
  errorMessage: string;
  count: number;
  bids: Bid[];
};

type BidState = {
  isLoading: boolean;
  isError: boolean;
  bidCount: number;
  userBids: Bid[];
};

export const placeBid = createAsyncThunk(
  "bid/placeBid",
  async (bidRequest: BidRequest, thunkAPI) => {
    try {
      console.log(bidRequest);
      const { data } = await customAxios.post(
        "https://atelierbidservice.azurewebsites.net/api/bid",
        bidRequest
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
export const getUserBids = createAsyncThunk(
  "bid/getUserBids",
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get(
        "https://atelierbidservice.azurewebsites.net/api/bid"
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

const initialState: BidState = {
  isLoading: false,
  isError: false,
  bidCount: 0,
  userBids: [],
};
export const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBid.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        placeBid.fulfilled,
        (state, action: PayloadAction<placeBidResponse>) => {
          state.isLoading = false;
          toast.success(action.payload.result);
        }
      )
      .addCase(placeBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong :("
        );
      })
      .addCase(getUserBids.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getUserBids.fulfilled,
        (state, action: PayloadAction<bidsResponse>) => {
          state.isLoading = false;
          state.bidCount = action.payload.count;
          state.userBids = action.payload.bids;
        }
      )
      .addCase(getUserBids.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
