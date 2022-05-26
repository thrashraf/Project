import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import api from '../../utils/api';
import url from '../../utils/url';

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

  //? for upload state
  files: [],
  validFiles: [],
  isUploadError: false,
  uploadErrorMessage: '',

  listActivities: null,
};

export const activitiesSlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    viewDetailActivities: (state: any, action: any) => {
      state.detailActivities = action.payload;
    },

    dropdownActivities: (state: any, action: any) => {
      state.activities = action.payload;
    },

    addNewActivities: (state: any, action: any) => {
      state.activities = [...state.activities, action.payload];
      state.activitiesMonth = [...state.activitiesMonth, action.payload].sort(
        (start: any, end: any) =>
          (new Date(start.end) as any) - (new Date(end.end) as any)
      );
    },

    deleteActivitiesHandler: (state: any, action: any) => {
      console.log(action.payload);
      const index = state.activities.findIndex(
        (event: any) => event.id === action.payload
      );
      console.log(index);
      state.activities.splice(index, 1);
      state.activitiesMonth.splice(index, 1);
    },

    editActivitiesHandler: (state: any, action: any) => {
      let activities = [...state.activities];
      let activitiesMonth = [...state.activitiesMonth];

      console.log(action.payload);
      const index = state.activities.findIndex(
        (event: any) => event.id === action.payload.id
      );

      console.log(index);

      state.activities[index] = action.payload;
      state.activitiesMonth[index] = action.payload;

      console.log(state.activities);
    },

    //for toggle edit mode
    editModeHandler: (state: any) => {
      state.editMode = !state.editMode;
    },

    closeEditMode: (state: any) => {
      state.editMode = false;
    },

    // filter reducers //
    handleFilter: (state: any, action: any) => {
      console.log(action.payload);

      const searchWord = action.payload;
      state.query = searchWord;

      const keys = ['title', 'organizer'];

      const newFilter = state.activities.filter((value: any) =>
        keys.some((key) =>
          value[key].toLowerCase().includes(searchWord.toLowerCase())
        )
      );
      if (searchWord !== '') {
        state.filterData = newFilter;
        state.showFilter = true;
      } else {
        state.filterData = [];
        state.showFilter = !state.showFilter;
      }
    },

    setFilterHandler: (state: any, action: any) => {
      state.query = action.payload;
      state.showFilter = !state.showFilter;
    },

    setViewHandler: (state: any, action: any) => {
      state.view = action.payload;
    },

    //? for files functionality
  },
  extraReducers: (builder) => {
    // ? get activities based on query
    builder.addCase(getActivities.fulfilled, (state, { payload }: any) => {
      state.isFetching = false;
      state.isSuccess = true;
      //sort activities: any
      state.activities = payload
        ?.map((item: any) => ({
          ...item,
          start: new Date(item.start),
          end: new Date(item.end),
        }))
        .sort(
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
      state.isSuccess = true;
      state.isFetching = false;
    });
    builder.addCase(deleteActivities.pending, (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    });
    builder.addCase(deleteActivities.rejected, (state) => {
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export const getActivities = createAsyncThunk(
  'activities/getAllUser',
  async (query: any, thunkAPI) => {
    try {
      const response = await api.get(
        `${url}/api/activities/getAllActivities?q=${query}`,
        {
          withCredentials: true,
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
  'activities/getMonthActivities',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(
        `${url}/api/activities/getAllActivities?q=`,
        {
          withCredentials: true,
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

export const deleteActivities = createAsyncThunk(
  'activities/deleteActivities',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.delete(
        `${url}/api/activities/deleteActivities?q=${id}`,
        {
          withCredentials: true,
        }
      );
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
  viewDetailActivities,
  dropdownActivities,
  addNewActivities,
  handleFilter,
  setFilterHandler,
  setViewHandler,
  deleteActivitiesHandler,
  editModeHandler,
  editActivitiesHandler,
  closeEditMode,
  // removeFile,
  // filterFile,
  // resetFile,
} = activitiesSlice.actions;
export const activitiesSelector = (state: RootState) => state.activities;
export default activitiesSlice.reducer;
