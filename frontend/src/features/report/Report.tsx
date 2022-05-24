import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import api from '../../utils/api';

export const reportSlice = createSlice({
  name: 'Report',
  initialState: {
    allUsers: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    submitReport: false,
  },
  reducers: {},
});

export const reportSelector = (state: RootState) => state.user;
export default reportSlice.reducer;
