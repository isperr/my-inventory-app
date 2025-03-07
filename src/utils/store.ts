import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../modules/auth/slice'
import schachenmayrAddReducer from '../modules/schachenmayr/add/slice'
import cataniaReducer from '../modules/catania/results/slice'
import cataniaHomeReducer from '../modules/catania/home/slice'
import cataniaSearchReducer from '../modules/catania/search/slice'
import cataniaColorReducer from '../modules/catania-color/results/slice'
import cataniaColorHomeReducer from '../modules/catania-color/home/slice'
import cataniaColorSearchReducer from '../modules/catania-color/search/slice'
import gruendlAddReducer from '../modules/schachenmayr/add/slice'
import cottonQuickSearchReducer from '../modules/cotton-quick/search/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catania: cataniaReducer,
    cataniaHome: cataniaHomeReducer,
    cataniaSearch: cataniaSearchReducer,
    cataniaColor: cataniaColorReducer,
    cataniaColorHome: cataniaColorHomeReducer,
    cataniaColorSearch: cataniaColorSearchReducer,
    cottonQuickSearch: cottonQuickSearchReducer,
    gruendlAdd: gruendlAddReducer,
    schachenmayrAdd: schachenmayrAddReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'cataniaColorHome/loadingError',
          'cataniaColorResults/loadingError',
          'cataniaColorSearch/loadingError',
          'cataniaHome/loadingError',
          'cataniaResults/loadingError',
          'cataniaSearch/loadingError'
        ],
        ignoredActionPaths: ['payload']
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
