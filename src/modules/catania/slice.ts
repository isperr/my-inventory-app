import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../utils/store'
import {DocumentData} from 'firebase/firestore'

export type CataniaDocumentData = DocumentData & {
  imgUrl: string
}

// Define a type for the slice state
interface CataniaState {
  data: CataniaDocumentData[]
  error: Error | null
  isLoading: boolean
}

// Define the initial state using that type
const initialState: CataniaState = {
  data: [],
  error: null,
  isLoading: false
}

export const cataniaState = createSlice({
  name: 'catania',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
    },
    loaded: (state, action: PayloadAction<CataniaDocumentData[]>) => {
      state.data = action.payload
      state.isLoading = false
    },
    loadingError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {load, loaded, loadingError} = cataniaState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.catania.data
export const selectIsLoading = (state: RootState) => state.catania.isLoading

export default cataniaState.reducer
