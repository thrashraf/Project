import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/Store';
import api from '../../utils/api';
import axiosInstance from '../../utils/axiosInstance';

interface interfaceState {
  [key: string]: any;
}

const initialState: interfaceState = {
  allPublication: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',

  query: '',

  //for user's search features
  //? - this to show filer (by default it's false)
  showFilter: false,
  //? - this to filter the array data
  filterData: [],
};

export const publicationSlice = createSlice({
  name: 'Publication',
  initialState,
  reducers: {
    addPublication: (state: any, action: any) => {
      console.log(action.payload);
      state.allPublication = [...state.allPublication, action.payload];
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

    // filter reducers //
    handleFilter: (state: any, action: any) => {
      console.log(action.payload);

      const searchWord = action.payload;
      state.query = searchWord;

      const newFilter = state.allPublication.filter((value: any) =>
        value.Title.toLowerCase().includes(searchWord.toLowerCase())
      );

      console.log(newFilter);

      if (searchWord !== '') {
        state.filterData = newFilter;
        state.showFilter = true;
      } else {
        state.filterData = [];
        state.showFilter = !state.showFilter;
      }
    },

    setFilterInnovation: (state: any, action: any) => {
      state.allPublication = action.payload;
    },

    setFilterHandler: (state: any, action: any) => {
      state.query = action.payload;
      state.showFilter = !state.showFilter;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllPublication.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.allPublication = payload.allPublication;
    });
    builder.addCase(getAllPublication.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllPublication.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export const getAllPublication = createAsyncThunk(
  '/api/Publication/getAllPublication',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/publication/getAllPublication`,
        {
          withCredentials: true,
        }
      );
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

export const {
  addPublication,
  editPublicationHandler,
  deletePublicationHandler,
  handleFilter,
  setFilterHandler,
  setFilterInnovation,
} = publicationSlice.actions;
export const publicationSelector = (state: RootState) => state.publication;
export default publicationSlice.reducer;
