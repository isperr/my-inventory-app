import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../utils/store'
import {DocumentData} from 'firebase/firestore'

export type CataniaDocumentData = DocumentData & {
  imgUrl?: string | null
}
export type CataniaEntitieType = {
  [k: string]: CataniaDocumentData
}

// Define a type for the slice state
interface CataniaState {
  data: CataniaDocumentData[]
  entities: CataniaEntitieType
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
  isResolved: Array<string>
  isResolving: Array<string>
  resolvingError: {
    [k: string]: Error | null
  }
}

// Define the initial state using that type
const initialState: CataniaState = {
  data: [],
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false,
  isResolved: [],
  isResolving: [],
  resolvingError: {}
}

export const cataniaState = createSlice({
  name: 'catania',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
    },
    loaded: (state, action: PayloadAction<CataniaDocumentData[]>) => {
      const resolved: Array<string> = []
      state.data = action.payload

      state.entities = action.payload.reduce((acc, item) => {
        resolved.push(item.color.toString())
        return {...acc, [item.color]: item}
      }, {})

      state.isLoaded = true
      state.isLoading = false

      state.isResolved.push(...resolved)
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoaded = false
      state.isLoading = false
      state.error = action.payload
    },
    resolve: (state, action: PayloadAction<string>) => {
      const id = action.payload

      // remove id from resolved array in case it gets loaded again
      const resolvedIdx = state.isResolved.indexOf(id)
      if (resolvedIdx !== -1) {
        state.isResolved.splice(resolvedIdx, 1)
      }
      // add id to resolving array if it is not included yet
      if (!state.isResolving.includes(id)) {
        state.isResolving.push(id)
      }
    },
    resolved: (
      state,
      action: PayloadAction<{data: CataniaDocumentData | undefined; id: string}>
    ) => {
      const {data, id} = action.payload

      if (data) {
        state.entities[id] = data
      }

      // add id to resolved array
      if (!state.isResolved.includes(id)) {
        state.isResolved.push(id)
      }
      // remove id from resolving array
      const resolvingIdx = state.isResolving.indexOf(id)
      if (state.isResolving.includes(id)) {
        state.isResolving.splice(resolvingIdx, 1)
      }
    },
    resolvingError: (
      state,
      action: PayloadAction<{error: Error; id: string}>
    ) => {
      const {error, id} = action.payload

      // remove id from resolving array
      const resolvingIdx = state.isResolving.indexOf(id)
      if (state.isResolving.includes(id)) {
        state.isResolving.splice(resolvingIdx, 1)
      }

      state.resolvingError[id] = error
    }
  }
})

export const {load, loaded, loadingError, resolve, resolved, resolvingError} =
  cataniaState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.catania.data
export const selectEntities = (state: RootState) => state.catania.entities
export const selectIsLoaded = (state: RootState) => state.catania.isLoaded
export const selectIsLoading = (state: RootState) => state.catania.isLoading
export const selectError = (state: RootState) => state.catania.error

// resolve selectors
type ResolveStateReturnType = (state: RootState) => boolean
type ResolveStateDataReturnType = (
  state: RootState
) => CataniaDocumentData | null

export const selectIsResolved = (state: RootState) => state.catania.isResolved
export const selectIsIdResolved = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolved(state)],
    resolvedArr => (id ? resolvedArr.includes(id) : false)
  )
export const selectIsResolving = (state: RootState) => state.catania.isResolving
export const selectIsIdResolving = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolving(state)],
    resolvingArr => (id ? resolvingArr.includes(id) : false)
  )
export const selectResolveError = (state: RootState) =>
  state.catania.resolvingError
export const selectHasResolveError = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectResolveError(state)],
    resolveError => (id ? Boolean(resolveError[id]) : false)
  )
export const selectResolveData = (id?: string): ResolveStateDataReturnType =>
  createSelector([(state: RootState) => selectEntities(state)], entities =>
    id ? entities[id] : null
  )

export default cataniaState.reducer
