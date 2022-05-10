import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/User';
import adminReducer from '../features/admin/Admin';
import activitiesReducer from '../features/activities/Activities';
import innovationReducer from '../features/Innovation/Innovation';
import publicationReducer from '../features/Publication/Publication';

export const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    activities: activitiesReducer,
    innovation: innovationReducer,
    publication: publicationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
