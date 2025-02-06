import {createSlice, PayloadAction} from '@reduxjs/toolkit'
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
  isUpdating: 'add' | 'remove' | null
  isUpdated: boolean
  resolvingError: {
    [k: string]: Error | null
  }
  updatingError: Error | null
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
  isUpdated: false,
  isUpdating: null,
  resolvingError: {},
  updatingError: null
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
    },
    updateCount: (state, action: PayloadAction<'add' | 'remove' | null>) => {
      state.isUpdating = action.payload
      state.isUpdated = false
    },
    countUpdated: (
      state,
      action: PayloadAction<{count: number; id: string}>
    ) => {
      const {count, id} = action.payload

      const idx = state.data.findIndex(it => it.color === id)
      // only try to update data if items in list are loaded
      if (idx !== -1) {
        state.data[idx] = {...state.data[idx], count}
      }

      // always update data in entities
      state.entities[id] = {...state.entities[id], count}

      state.isUpdating = null
      state.isUpdated = true
    },
    countUpdateError: (state, action: PayloadAction<Error>) => {
      state.isUpdating = null
      state.isUpdated = false
      state.updatingError = action.payload
    }
  }
})

export const {
  load,
  loaded,
  loadingError,
  resolve,
  resolved,
  resolvingError,
  updateCount,
  countUpdateError,
  countUpdated
} = cataniaState.actions

export default cataniaState.reducer
