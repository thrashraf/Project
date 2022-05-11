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

  //? for upload state
  files: [],
  validFiles: [],
  isUploadError: false,
  uploadErrorMessage: '',
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
        (event: any) => event.id === action.payload
      );
      console.log(index);
      state.activities.splice(index, 1);
      state.activitiesMonth.splice(index, 1);
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
      state.activities[index].img_url = action.payload.images;

      state.activitiesMonth[index].title = action.payload.title;
      state.activitiesMonth[index].start = action.payload.start;
      state.activitiesMonth[index].venue = action.payload.venue;
      state.activitiesMonth[index].organizer = action.payload.organizer;
      state.activitiesMonth[index].img_url = action.payload.images;
      console.log(action.payload);

      //! state.detailActivities = action.payload;
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

    //? for files functionality

    // //for upload images or (file)
    // uploadFile: (state, action) => {
    //   action.payload.preventDefault();
    //   const files = action.payload.dataTransfer.files;

    //   //validate files

    //   for (let i = 0; i < files.length; i++) {
    //     if (activitiesSlice.actions.validateFile(files[i])) {
    //       console.log(files);
    //       state.files = [...state.files, ...files];
    //     } else {
    //       state.isUploadError = true;
    //       state.uploadErrorMessage = 'Images must be jpg/jpeg/png';
    //     }
    //   }
    // },

    // //filter images for duplicate images
    // filterFile: (state) => {
    //   const filteredImages = state.files.reduce((file: any, current: any) => {
    //     const x = file.find((item: any) => item.name === current.name);
    //     if (!x) {
    //       return file.concat([current]);
    //     } else {
    //       return file;
    //     }
    //   }, []);

    //   state.validFiles = [...filteredImages];
    // },

    // removeFile: (state, action) => {
    //   // find the index of the item
    //   // remove the item from array
    //   const validFileIndex = state.validFiles.findIndex(
    //     (e: any) => e.name === action.payload
    //   );
    //   state.validFiles.splice(validFileIndex, 1);

    //   const selectedFileIndex = state.files.findIndex(
    //     (e: any) => e.name === action.payload
    //   );
    //   state.files.splice(selectedFileIndex, 1);
    // },

    // resetFile: (state) => {
    //   state.files = [];
    //   state.validFiles = [];
    // },
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
  // uploadFile,
  // removeFile,
  // filterFile,
  // resetFile,
} = activitiesSlice.actions;
export const activitiesSelector = (state: RootState) => state.activities;
export default activitiesSlice.reducer;
