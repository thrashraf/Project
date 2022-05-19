import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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
  name: 'Publication',
  initialState,
  reducers: {
    addPublication: (state, action) => {
      state.allPublication = [...state.allPublication, action.payload]
    },

    editPublicationHandler: (state: any, action: any) => {

      const index = state.allPublication.findIndex(
        (publication: any) => publication.id === action.payload.id
      );

      state.allPublication[index] = action.payload;

    },

    deletePublicationHandler: (state: any, action: any) => {
      const index = state.allPublication.findIndex(
        (publication: any) => publication.id === action.payload
      );
      state.allPublication.splice(index, 1);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllPublication.fulfilled, (state, { payload }: any) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.allPublication = payload.allPublication
      });
      builder.addCase(getAllPublication.pending, (state) => {
        state.isFetching = true;
      });
      builder.addCase(getAllPublication.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        
    });
}
});


export const getAllPublication = createAsyncThunk(
    "/api/Publication/getAllPublication",
    async ( _, thunkAPI) => {
      try {

          const response = await axios.get("/api/publication/getAllPublication", {
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

export const {
  addPublication,
  editPublicationHandler,
  deletePublicationHandler
} = publicationSlice.actions
export const publicationSelector = (state: RootState) => state.publication;
export default publicationSlice.reducer;

