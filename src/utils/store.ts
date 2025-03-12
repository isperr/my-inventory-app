import {configureStore} from '@reduxjs/toolkit'

import authReducer from '../modules/auth/slice'
import woolAddReducer from '../modules/wool/add/slice'
// SCHACHENMAYR
import cataniaReducer from '../modules/catania/results/slice'
import cataniaHomeReducer from '../modules/catania/home/slice'
import cataniaSearchReducer from '../modules/catania/search/slice'
import cataniaColorReducer from '../modules/catania-color/results/slice'
import cataniaColorHomeReducer from '../modules/catania-color/home/slice'
import cataniaColorSearchReducer from '../modules/catania-color/search/slice'
// GRÜNDL
import cottonQuickSearchReducer from '../modules/cotton-quick/search/slice'
import cottonQuickHomeReducer from '../modules/cotton-quick/home/slice'
import cottonQuickReducer from '../modules/cotton-quick/results/slice'
import cottonQuickPrintSearchReducer from '../modules/cotton-quick-print/search/slice'
import cottonQuickPrintHomeReducer from '../modules/cotton-quick-print/home/slice'
import cottonQuickPrintReducer from '../modules/cotton-quick-print/results/slice'
import funnyUniReducer from '../modules/funny-uni/results/slice'
import funnyUniHomeReducer from '../modules/funny-uni/home/slice'
import funnyUniSearchReducer from '../modules/funny-uni/search/slice'
// MYBOSHI
import samtReducer from '../modules/samt/results/slice'
import samtHomeReducer from '../modules/samt/home/slice'
import samtSearchReducer from '../modules/samt/search/slice'
// AYOS
import samtBabyReducer from '../modules/samt-baby/results/slice'
import samtBabyHomeReducer from '../modules/samt-baby/home/slice'
import samtBabySearchReducer from '../modules/samt-baby/search/slice'
// HIMALAYA
import dolphinBabyReducer from '../modules/dolphin-baby/results/slice'
import dolphinBabyHomeReducer from '../modules/dolphin-baby/home/slice'
import dolphinBabySearchReducer from '../modules/dolphin-baby/search/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    woolAdd: woolAddReducer,
    catania: cataniaReducer,
    cataniaHome: cataniaHomeReducer,
    cataniaSearch: cataniaSearchReducer,
    cataniaColor: cataniaColorReducer,
    cataniaColorHome: cataniaColorHomeReducer,
    cataniaColorSearch: cataniaColorSearchReducer,
    cottonQuick: cottonQuickReducer,
    cottonQuickHome: cottonQuickHomeReducer,
    cottonQuickSearch: cottonQuickSearchReducer,
    cottonQuickPrint: cottonQuickPrintReducer,
    cottonQuickPrintHome: cottonQuickPrintHomeReducer,
    cottonQuickPrintSearch: cottonQuickPrintSearchReducer,
    funnyUni: funnyUniReducer,
    funnyUniHome: funnyUniHomeReducer,
    funnyUniSearch: funnyUniSearchReducer,
    samt: samtReducer,
    samtHome: samtHomeReducer,
    samtSearch: samtSearchReducer,
    samtBaby: samtBabyReducer,
    samtBabyHome: samtBabyHomeReducer,
    samtBabySearch: samtBabySearchReducer,
    dolphinBaby: dolphinBabyReducer,
    dolphinBabyHome: dolphinBabyHomeReducer,
    dolphinBabySearch: dolphinBabySearchReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'cataniaColorHome/loadingError',
          'cataniaColor/loadingError',
          'cataniaColorSearch/loadingError',
          'cataniaHome/loadingError',
          'catania/loadingError',
          'cataniaSearch/loadingError',
          'cottonQuickHome/loadingError',
          'cottonQuick/loadingError',
          'cottonQuickSearch/loadingError',
          'cottonQuickPrintHome/loadingError',
          'cottonQuickPrint/loadingError',
          'cottonQuickSearchPrint/loadingError',
          'funnyUniHome/loadingError',
          'funnyUni/loadingError',
          'funnyUniSearch/loadingError',
          'samtHome/loadingError',
          'samt/loadingError',
          'samtSearch/loadingError',
          'samtBabyHome/loadingError',
          'samtBaby/loadingError',
          'samtBabySearch/loadingError',
          'dolphinBabyHome/loadingError',
          'dolphinBaby/loadingError',
          'dolphinBabySearch/loadingError'
        ],
        ignoredActionPaths: ['payload']
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
