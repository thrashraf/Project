import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/User'
import adminReducer from '../features/admin/Admin';

export const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch
