import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../modules/auth/slice'
import cataniaReducer from '../modules/catania/results/slice'
import cataniaHomeReducer from '../modules/catania/home/slice'
import cataniaSearchReducer from '../modules/catania/search/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catania: cataniaReducer,
    cataniaHome: cataniaHomeReducer,
    cataniaSearch: cataniaSearchReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cataniaSearch/loadingError'],
        ignoredActionPaths: ['payload']
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
