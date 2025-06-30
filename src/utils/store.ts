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
import kingCottonReducer from '../modules/king-cotton/results/slice'
import kingCottonHomeReducer from '../modules/king-cotton/home/slice'
import kingCottonSearchReducer from '../modules/king-cotton/search/slice'
import lisaPremiumUniReducer from '../modules/lisa-premium-uni/results/slice'
import lisaPremiumUniHomeReducer from '../modules/lisa-premium-uni/home/slice'
import lisaPremiumUniSearchReducer from '../modules/lisa-premium-uni/search/slice'
// MYBOSHI
import samtReducer from '../modules/samt/results/slice'
import samtHomeReducer from '../modules/samt/home/slice'
import samtSearchReducer from '../modules/samt/search/slice'
// AYOS
import samtBabyReducer from '../modules/samt-baby/results/slice'
import samtBabyHomeReducer from '../modules/samt-baby/home/slice'
import samtBabySearchReducer from '../modules/samt-baby/search/slice'
import fluffyReducer from '../modules/fluffy/results/slice'
import fluffyHomeReducer from '../modules/fluffy/home/slice'
import fluffySearchReducer from '../modules/fluffy/search/slice'
// HIMALAYA
import dolphinBabyReducer from '../modules/dolphin-baby/results/slice'
import dolphinBabyHomeReducer from '../modules/dolphin-baby/home/slice'
import dolphinBabySearchReducer from '../modules/dolphin-baby/search/slice'
// HOBBII
import babySnuggleReducer from '../modules/baby-snuggle-solid/results/slice'
import babySnuggleHomeReducer from '../modules/baby-snuggle-solid/home/slice'
import babySnuggleSearchReducer from '../modules/baby-snuggle-solid/search/slice'

// FINISHED-ITEMS
import finishedItemsReducer from '../modules/finished-items/results/slice'
import finishedItemsAddReducer from '../modules/finished-items/add/slice'

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
    kingCotton: kingCottonReducer,
    kingCottonHome: kingCottonHomeReducer,
    kingCottonSearch: kingCottonSearchReducer,
    lisaPremiumUni: lisaPremiumUniReducer,
    lisaPremiumUniHome: lisaPremiumUniHomeReducer,
    lisaPremiumUniSearch: lisaPremiumUniSearchReducer,
    samt: samtReducer,
    samtHome: samtHomeReducer,
    samtSearch: samtSearchReducer,
    samtBaby: samtBabyReducer,
    samtBabyHome: samtBabyHomeReducer,
    samtBabySearch: samtBabySearchReducer,
    fluffy: fluffyReducer,
    fluffyHome: fluffyHomeReducer,
    fluffySearch: fluffySearchReducer,
    dolphinBaby: dolphinBabyReducer,
    dolphinBabyHome: dolphinBabyHomeReducer,
    dolphinBabySearch: dolphinBabySearchReducer,
    babySnuggle: babySnuggleReducer,
    babySnuggleHome: babySnuggleHomeReducer,
    babySnuggleSearch: babySnuggleSearchReducer,
    finishedItems: finishedItemsReducer,
    finishedItemsAdd: finishedItemsAddReducer
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
          'kingCottonUniHome/loadingError',
          'kingCottonUni/loadingError',
          'kingCottonUniSearch/loadingError',
          'lisaPremiumUniHome/loadingError',
          'lisaPremiumUni/loadingError',
          'lisaPremiumUniSearch/loadingError',
          'samtHome/loadingError',
          'samt/loadingError',
          'samtSearch/loadingError',
          'samtBabyHome/loadingError',
          'samtBaby/loadingError',
          'samtBabySearch/loadingError',
          'fluffyHome/loadingError',
          'fluffy/loadingError',
          'fluffySearch/loadingError',
          'dolphinBabyHome/loadingError',
          'dolphinBaby/loadingError',
          'dolphinBabySearch/loadingError',
          'babySnuggleHome/loadingError',
          'babySnuggle/loadingError',
          'babySnuggleSearch/loadingError',
          'finishedItems/loadingError',
          'finishedItemsAdd/addingError'
        ],
        ignoredActionPaths: ['payload']
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
