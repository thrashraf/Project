import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/Store";
import jwt_decode from 'jwt-decode';

interface loginInterface{
  email: string;
  password: string;

}
interface user {
  name: string;
  email: string;
  password: string;
}

const initialState = () => ({
  user: null,
  token: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  redirect: ''
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    clearState: () => initialState(),
    
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.redirect = payload.route;
      state.user = jwt_decode(payload.accessToken);
      state.token = payload.accessToken;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(refreshUser.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = jwt_decode(payload.accessToken);
      state.token = payload.accessToken;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(refreshUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

  },
});

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, email, password }: user, thunkAPI) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      let data = await response.json();

      if (response.status === 200) {
        console.log("data", data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }: loginInterface, thunkAPI) => {
    try {
      const response = await fetch(
        "/api/user/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )
      let data = await response.json()
      console.log("response", data)
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e: any) {
      console.log("Error", e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const refreshUser = createAsyncThunk(
  "users/token",
  async (_, thunkAPI: any) => {
    try {
      const response = await fetch(
        "/api/user/token",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      let data = await response.json()
      console.log("response", data)
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e: any) {
      console.log("Error", e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const { login, logout, clearState } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
