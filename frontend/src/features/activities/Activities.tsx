import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import api from '../../utils/api';

interface interfaceState {
  [key: string]: any;
}

const initialState: interfaceState = {
  //for all activities
  activities: null,

  //for user view either calendar or list
  view: 'calendar',

  //for filter user's search
  query: '',

  //for sidebar activities
  activitiesMonth: null,

  //for user's search features
  //? - this to show filer (by default it's false)
  showFilter: false,
  //? - this to filter the array data
  filterData: [],

  // for show details activities on modal
  detailActivities: null,

  //for filter list (by All, draft & done)
  filterBy: 'all',

  //for edit
  editMode: false,

  //* request variables
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  //*
};

export const activitiesSlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    viewDetailActivities: (state, action) => {
      state.detailActivities = action.payload;
    },

    dropdownActivities: (state, action) => {
      state.activities = action.payload;
    },

    addNewActivities: (state, action) => {
      state.activities = [...state.activities, action.payload];
      state.activitiesMonth = [...state.activitiesMonth, action.payload].sort(
        (start: any, end: any) =>
          (new Date(start.end) as any) - (new Date(end.end) as any)
      );
    },

    deleteActivitiesHandler: (state, action) => {
      console.log(action.payload);
      const index = state.activities.findIndex(
        (event: any) => event.title === action.payload
      );
      state.activities.splice(1, index);
      state.activitiesMonth.splice(1, index);
    },

    editActivitiesHandler: (state, action) => {
      const index = state.activities.findIndex(
        (event: any) => event.id === action.payload.id
      );

      console.log(action.payload.images);

      state.activities[index].title = action.payload.title;
      state.activities[index].start = action.payload.start;
      state.activities[index].venue = action.payload.venue;
      state.activities[index].organizer = action.payload.organizer;
      state.activities[index].img_url = JSON.stringify(action.payload.images);

      state.activitiesMonth[index].title = action.payload.title;
      state.activitiesMonth[index].start = action.payload.start;
      state.activitiesMonth[index].venue = action.payload.venue;
      state.activitiesMonth[index].organizer = action.payload.organizer;
      state.activitiesMonth[index].img_url = JSON.stringify(
        action.payload.images
      );
    },

    //for toggle edit mode
    editModeHandler: (state) => {
      state.editMode = !state.editMode;
    },

    // filter reducers //
    handleFilter: (state, action) => {
      console.log(action.payload);

      const searchWord = action.payload;
      state.query = searchWord;

      const newFilter = state.activities.filter((value: any) =>
        value.title.toLowerCase().includes(searchWord.toLowerCase())
      );
      if (searchWord !== '') {
        state.filterData = newFilter;
        state.showFilter = true;
      } else {
        state.filterData = [];
        state.showFilter = !state.showFilter;
      }
    },

    setFilterHandler: (state, action) => {
      state.query = action.payload;
      state.showFilter = !state.showFilter;
    },

    setViewHandler: (state, action) => {
      state.view = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ? get activities based on query
    builder.addCase(getActivities.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      //sort activities
      state.activities = payload.sort(
        (start: any, end: any) =>
          (new Date(start.end) as any) - (new Date(end.end) as any)
      );
    });
    builder.addCase(getActivities.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getActivities.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    // ? get activities for side bar
    builder.addCase(getMonthActivities.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      //sort activities
      state.activitiesMonth = payload.sort(
        (start: any, end: any) =>
          (new Date(start.end) as any) - (new Date(end.end) as any)
      );
    });
    builder.addCase(getMonthActivities.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getMonthActivities.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    // ? delete activities
    builder.addCase(deleteActivities.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteActivities.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(deleteActivities.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });

    // ? update activities
    builder.addCase(updateActivities.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    });
    builder.addCase(updateActivities.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateActivities.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
  },
});

export const getActivities = createAsyncThunk(
  '/api/admin/getAllUser',
  async (query: any, thunkAPI) => {
    try {
      const response = await api.get(
        `/api/activities/getAllActivities?q=${query}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.data;

      if (response.status === 200) {
        console.log(data);
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

export const getMonthActivities = createAsyncThunk(
  '/api/admin/getMonthActivities',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/api/activities/getAllActivities?q=`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let data = await response.data;

      if (response.status === 200) {
        console.log(data);
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

export const deleteActivities = createAsyncThunk(
  '/api/admin/deleteActivities',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.delete(
        `/api/activities/deleteActivities?q=${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.data;

      if (response.status === 200) {
        console.log(data);
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

export const updateActivities = createAsyncThunk(
  '/api/admin/updateActivities',
  async (newActivities: any, thunkAPI) => {
    try {
      const response = await api.post(
        `/api/activities/updateActivities?q=${newActivities.id}`,
        { newActivities },
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.data;

      if (response.status === 200) {
        console.log(data);
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
  viewDetailActivities,
  dropdownActivities,
  addNewActivities,
  handleFilter,
  setFilterHandler,
  setViewHandler,
  deleteActivitiesHandler,
  editModeHandler,
  editActivitiesHandler,
} = activitiesSlice.actions;
export const activitiesSelector = (state: RootState) => state.activities;
export default activitiesSlice.reducer;
