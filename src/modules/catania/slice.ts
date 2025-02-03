import {createSlice, PayloadAction} from '@reduxjs/toolkit'
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
}

// Define the initial state using that type
const initialState: CataniaState = {
  data: [],
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false
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
      state.data = action.payload
      state.entities = action.payload.reduce(
        (acc, item) => ({...acc, [item.color]: item}),
        {}
      )
      state.isLoaded = true
      state.isLoading = false
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoaded = false
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {load, loaded, loadingError} = cataniaState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.catania.data
export const selectEntities = (state: RootState) => state.catania.entities
export const selectIsLoaded = (state: RootState) => state.catania.isLoaded
export const selectIsLoading = (state: RootState) => state.catania.isLoading
export const selectError = (state: RootState) => state.catania.error

export default cataniaState.reducer
