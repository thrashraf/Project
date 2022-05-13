import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import api from '../../utils/api';

interface interfaceState {
  [key: string]: any;
}

const initialState: interfaceState = {
  allPublication: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const publicationSlice = createSlice({
  name: 'Report',
  initialState,
  reducers: {},
});

// export const getAllUser = createAsyncThunk(
//     "/api/admin/getAllUser",
//     async ( _, thunkAPI) => {
//       try {

//           const response = await api.get("/api/user/getAllUser", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",

//           },
//         });
//         let data = await response.data;

//         if (response.status === 200) {
//           console.log(data, response);
//           return data;
//         } else {
//           return thunkAPI.rejectWithValue(data);
//         }
//       } catch (e: any) {
//         console.log(e);
//         console.log("Error", e.response.data);
//         return thunkAPI.rejectWithValue(e.response.data);
//       }
//     }
//   );

export const reportSelector = (state: RootState) => state.user;
export default publicationSlice.reducer;
