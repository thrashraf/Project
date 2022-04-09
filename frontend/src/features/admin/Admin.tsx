import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/Store";
import api from "../../utils/api";


export const adminSlice = createSlice({
    name: "Admin",
    initialState: {
        allUsers: null,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.fulfilled, (state, { payload }: any) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.allUsers = payload.allUser
          });
          builder.addCase(getAllUser.pending, (state) => {
            state.isFetching = true;
          });
          builder.addCase(getAllUser.rejected, (state, { payload }: any) => {
            state.isFetching = false;
            state.isError = true;
            
        });
    }
});

export const getAllUser = createAsyncThunk(
    "/api/admin/getAllUser",
    async ( _, thunkAPI) => {
      try {
          
          const response = await api.get("/api/user/getAllUser", {
          method: "GET", 
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
          },
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
        console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );



export const userSelector = (state: RootState) => state.user;
export default adminSlice.reducer;