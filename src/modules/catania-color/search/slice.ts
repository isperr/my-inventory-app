import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {CataniaDocumentData} from '../../catania/types'

// Define a type for the slice state
interface CataniaColorSearchState {
  data: CataniaDocumentData[]
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
}

// Define the initial state using that type
const initialState: CataniaColorSearchState = {
  data: [],
  error: null,
  isLoaded: false,
  isLoading: false
}

export const cataniaColorSearchState = createSlice({
  name: 'cataniaColorSearch',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    load: state => {
      state.data = []
      state.isLoading = true
      state.isLoaded = false
    },
    loaded: (state, action: PayloadAction<CataniaDocumentData | undefined>) => {
      if (action.payload) {
        state.data = [action.payload]
      }
      state.isLoaded = true
      state.isLoading = false
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoaded = false
      state.isLoading = false
      state.error = action.payload
    },
    reset: state => {
      state.data = initialState.data
      state.error = initialState.error
      state.isLoaded = initialState.isLoaded
      state.isLoading = initialState.isLoading
    }
  }
})

export const {load, loaded, loadingError, reset} =
  cataniaColorSearchState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.cataniaColorSearch.data
export const selectIsLoaded = (state: RootState) =>
  state.cataniaColorSearch.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.cataniaColorSearch.isLoading
export const selectError = (state: RootState) => state.cataniaColorSearch.error

export default cataniaColorSearchState.reducer
