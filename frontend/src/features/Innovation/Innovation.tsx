import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/Store';

interface interfaceState {
  [key: string]: any;
}

const initialState: interfaceState = {
  allInnovation: null,
  tempInnovation: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',

  //for filter user's search
  query: '',

  //for user's search features
  //? - this to show filer (by default it's false)
  showFilter: false,
  //? - this to filter the array data
  filterData: [],
};

export const innovationSlice = createSlice({
  name: 'Report',
  initialState,
  reducers: {
    addInnovationHandler: (state: any, action: any) => {
      state.allInnovation = [...state.allInnovation, action.payload];
    },
    // filter reducers //
    handleFilter: (state: any, action: any) => {
      console.log(action.payload);

      const searchWord = action.payload;
      state.query = searchWord;

      const newFilter = state.allInnovation.filter((value: any) =>
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
      state.allInnovation = action.payload;
    },

    setFilterHandler: (state: any, action: any) => {
      state.query = action.payload;
      state.showFilter = !state.showFilter;
    },

    setViewHandler: (state: any, action: any) => {
      state.view = action.payload;
    },

    editInnovationHandler: (state: any, action: any) => {
      const index = state.allInnovation.findIndex(
        (innovation: any) => innovation.id === action.payload.id
      );

      console.log(index);

      state.allInnovation[index] = action.payload;
    },

    deleteInnovationHandler: (state: any, action: any) => {
      const index = state.allInnovation.findIndex(
        (publication: any) => publication.id === action.payload
      );
      state.allInnovation.splice(index, 1);
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(getInnovation.fulfilled, (state: any, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.allInnovation = payload;
      state.tempInnovation = payload;
    });
    builder.addCase(getInnovation.pending, (state: any) => {
      state.isFetching = true;
    });
    builder.addCase(getInnovation.rejected, (state: any, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
  },
});

export const getInnovation = createAsyncThunk(
  'Innovation/getAllInnovation',
  async (query: any, thunkAPI) => {
    try {
      const response = await axios.get(`/api/inno/getAllInno?q=${query}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const {
  addInnovationHandler,
  handleFilter,
  setFilterHandler,
  setViewHandler,
  setFilterInnovation,
  editInnovationHandler,
  deleteInnovationHandler,
  // filterFile,
  // resetFile,
} = innovationSlice.actions;
export const innovationSelector = (state: RootState) => state.innovation;
export default innovationSlice.reducer;
