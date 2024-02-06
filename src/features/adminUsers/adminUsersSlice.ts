import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type UsersResponse = {
  errorResponse: string;
  count: number;
  users: adminUser[];
};

type adminUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

type adminUsersState = {
  isLoading: boolean;
  isError: boolean;
  usersCount: number;
  users: adminUser[];
};
const initialState: adminUsersState = {
  isLoading: false,
  isError: false,
  usersCount: 0,
  users: [],
};
const authBaseURL: string = "https://localhost:7295/api/auth";
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(authBaseURL);
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

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<UsersResponse>) => {
          state.isLoading = false;
          state.usersCount = action.payload.count;
          state.users = action.payload.users;
        }
      )
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
