import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "../../utils/axios";
import { toast } from "react-toastify";

type PlaceOrderRequest = {
  bidId: string;
};
type PlaceOrderResponse = {
  errorMessage: string;
  result: string;
};
type Order = {
  id: string;
  userId: string;
  bidId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  orderAmount: number;
  stripeSessionId: string;
  status: string;
  paymentIntent: string;
};

type OrdersResponse = {
  errorMessage: string;
  count: number;
  orders: Order[];
};

type OrderState = {
  isLoading: boolean;
  isError: boolean;
  orderCount: number;
  orders: Order[];
};

const initialState: OrderState = {
  isLoading: false,
  isError: false,
  orderCount: 0,
  orders: [],
};
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderRequest: PlaceOrderRequest, thunkAPI) => {
    try {
      console.log(orderRequest);
      const { data } = await customAxios.post(
        "https://atelierorderservice.azurewebsites.net/api/order",
        orderRequest
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.errorMessage || "An error occurred... :("
        );
      }
    }
  }
);
export const getPendingOrders = createAsyncThunk(
  "https://atelierorderservice.azurewebsites.net/orders/getPendingOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get("api/order");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.errorMessage || "An error occurred... :("
        );
      }
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        placeOrder.fulfilled,
        (state, action: PayloadAction<PlaceOrderResponse>) => {
          state.isLoading = false;
          toast.success(action.payload.result);
        }
      )
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong... :("
        );
      })
      .addCase(getPendingOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getPendingOrders.fulfilled,
        (state, action: PayloadAction<OrdersResponse>) => {
          state.isLoading = false;
          state.orderCount = action.payload.count;
          state.orders = action.payload.orders;
        }
      )
      .addCase(getPendingOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
