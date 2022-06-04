import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import api from '../../utils/api';
import axiosInstance from '../../utils/axiosInstance';

export const adminSlice = createSlice({
  name: 'Admin',
  initialState: {
    allUsers: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    //for user's search features
    //? - this to show filer (by default it's false)
    showFilterUser: false,
    //? - this to filter the array data
    queryUser: '',
    filterDataUser: [],
    eventKpi: 0,
    publicationKpi: 0,
    innovationKpi: 0,
  },
  reducers: {
    addUser: (state: any, action: any) => {
      state.allUsers = [...state.allUsers, action.payload];
    },

    updateUserHandler: (state: any, action: any) => {
      console.log(action.payload);
      const index = state.allUsers.findIndex(
        (user: any) => user.id === action.payload.id
      );

      console.log(index);

      state.allUsers[index] = action.payload;
    },

    deleteUserHandler: (state: any, action: any) => {
      console.log(action);
      const index = state.allUsers.findIndex(
        (event: any) => event.id === action.payload
      );
      state.allUsers.splice(index, 1);
    },

    // filter reducers //
    handleFilter: (state: any, action: any) => {
      const searchWord = action.payload;
      state.queryUser = searchWord;

      const newFilter = state.allUsers.filter((value: any) =>
        value.name.toLowerCase().includes(searchWord.toLowerCase())
      );

      if (searchWord !== '') {
        state.filterDataUser = newFilter;
        state.showFilterUser = true;
      } else {
        state.filterDataUser = [];
        state.showFilterUser = !state.showFilterUser;
      }
    },

    setFilterHandler: (state: any, action: any) => {
      state.queryUser = action.payload;
      state.showFilterUser = !state.showFilterUser;
    },

    updateNewKpi: (state: any, action: any) => {
      console.log(action.payload);
      state.eventKpi = action.payload.event;
      state.publicationKpi = action.payload.publication;
      state.innovationKpi = action.payload.innovation;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.allUsers = payload;
    });
    builder.addCase(getAllUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(getKpi.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.eventKpi = payload[0].event;
      state.publicationKpi = payload[0].publication;
      state.innovationKpi = payload[0].innovation;
    });
    builder.addCase(getKpi.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getKpi.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export const getAllUser = createAsyncThunk(
  'admin/getUsers',
  async (query: string, thunkAPI) => {
    try {
      const response = await api.get(`/user/getAllUser?q=${query}`, {
        withCredentials: true,
      });
      let data = await response.data;

      if (response.status === 200) {
        console.log(data, response);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log(e);
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getKpi = createAsyncThunk('admin/getKpi', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/kpi/getKpi`, {
      withCredentials: true,
    });
    let data = await response.data;

    if (response.status === 200) {
      console.log(data, response);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e: any) {
    console.log(e);
    console.log('Error', e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const deleteUser = createAsyncThunk(
  '/api/admin/deleteActivities',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.delete(`/admin/deleteUser?q=${id}`, {
        withCredentials: true,
      });
      let data = await response.data;

      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log(e);
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const {
  updateUserHandler,
  deleteUserHandler,
  handleFilter,
  setFilterHandler,
  addUser,
  updateNewKpi,
} = adminSlice.actions;
export const adminSelector = (state: RootState) => state.admin;
export default adminSlice.reducer;
