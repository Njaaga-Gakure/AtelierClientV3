import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import axios from "axios";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  removeUserFromLocalStorage,
  getClaimFromToken,
} from "../../utils/helperFunctions";

type RegisterRequestUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
};
type LoginRequestUser = {
  email: string;
  password: string;
};
type LoginUserResponse = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  token: string;
};
type LoginResponse = {
  errorMessage: string;
  user: LoginUserResponse;
};

type UserState = {
  isLoading: boolean;
  user: User | null;
};
type RegisterResponse = {
  errorMessage: string | null;
  result: string | null;
};

export type User = LoginUserResponse & {
  role: string;
};
const authBaseURL: string = "https://localhost:7295/api/auth";

export const login = createAsyncThunk(
  "user/login",
  async (loginUser: LoginRequestUser, thunkAPI) => {
    try {
      const { data } = await axios.post(`${authBaseURL}/login`, loginUser);
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
export const register = createAsyncThunk(
  "user/register",
  async (registerUser: RegisterRequestUser, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${authBaseURL}/register`,
        registerUser
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

const initialState: UserState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      removeUserFromLocalStorage();
      toast.success("successfully logged out :)");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, { payload: { result } }: PayloadAction<RegisterResponse>) => {
          state.isLoading = false;
          toast.success(result);
        }
      )
      .addCase(register.rejected, (state: UserState, action) => {
        state.isLoading = false;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "An Error Occurred :("
        );
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          const role: string = getClaimFromToken(
            payload.user.token
          ).role.toLowerCase();
          state.user = { ...payload.user, role };
          setUserToLocalStorage(state.user);
          toast.success(`Welcome, ${payload.user.name.split(" ")[0]}`);
        }
      )
      .addCase(login.rejected, (state: UserState, action) => {
        state.isLoading = false;
        toast.error(
          typeof action.payload === "string"
            ? action.payload
            : "An Error Occurred :("
        );
      });
  },
});

export const { logout } = userSlice.actions;
