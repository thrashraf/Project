import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/User'
import adminReducer from '../features/admin/Admin';
import activitiesReducer from '../features/activities/Activities';

export const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    activities: activitiesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch
