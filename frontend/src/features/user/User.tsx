import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import api from '../../utils/api';
import url from '../../utils/url';

import axiosInstance from '../../utils/axiosInstance';

interface loginInterface {
  email: string;
  password: string;
}

const initialState = () => ({
  user: null,
  token: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  redirect: '',
  expired: null,
  editSignature: false,
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    login: (state: { user: any }, action: { payload: any }) => {
      state.user = action.payload;
    },
    logout: (state: { user: null }) => {
      state.user = null;
    },
    clearState: () => initialState(),
    instance: (state: { token: any }, action: { payload: { token: any } }) => {
      console.log(action.payload);
      state.token = action.payload.token;
    },

    updateProfile: (state: any, action: { payload: any }) => {
      state.user = { ...state.user, profile_picture: action.payload };
    },
    updateSignature: (state: any, action: { payload: any }) => {
      state.user.signature = action.payload;
      state.editSignature = false;
    },
    toggleEditSignature: (state: any) => {
      state.editSignature = !state.editSignature;
    },
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
      const user: any = jwt_decode(payload.accessToken);

      state.isFetching = false;
      state.isSuccess = true;
      state.redirect = payload.route;
      state.user = jwt_decode(payload.accessToken);
      state.expired = user.exp;
      state.token = payload.accessToken;
      localStorage.setItem('isAuth', 'true');
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
      const user: any = jwt_decode(payload.accessToken);

      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.user = jwt_decode(payload.accessToken);
      state.token = payload.accessToken;
      state.expired = user.exp;
      localStorage.setItem('isAuth', 'true');
      axios.defaults.headers.common = {
        authorization: `Bearer ${payload.accessToken}`,
      };
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(refreshUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    });
  },
});

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ userName, userEmail, userPassword }: any, thunkAPI) => {
    try {
      // console.log(userName, userEmail, userPassword);
      const response = await axiosInstance.post(
        '/user/register',
        {
          userName,
          userEmail,
          userPassword,
        },
        { withCredentials: true }
      );
      let data = await response.data;

      if (response.status === 200) {
        console.log('data', data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }: loginInterface, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      let data = await response.data;
      console.log('response', data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'users/token',
  async (_, thunkAPI: any) => {
    try {
      const response = await axiosInstance.get(`/user/token`, {
        withCredentials: true,
      });
      let data = await response.data;
      console.log('response', data);
      if (response.status === 200) {
        console.log(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateUserInformation = createAsyncThunk(
  'users/update',
  async ({ id, name, email, position, phoneNumber }: any, thunkAPI: any) => {
    try {
      const response = await api.post(
        `${url}/api/user/updateInformation`,
        {
          id,
          name,
          email,
          position,
          phoneNumber,
        },
        { withCredentials: true }
      );

      let data = await response.data;
      console.log('response', data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const {
  login,
  logout,
  clearState,
  instance,
  updateProfile,
  updateSignature,
  toggleEditSignature,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
