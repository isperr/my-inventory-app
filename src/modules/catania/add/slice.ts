import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

// Define a type for the slice state
interface CataniaAddState {
  color?: number
  isbn?: number
  error: Error | null
  isAdded: boolean
  isAdding: boolean
}

// Define the initial state using that type
const initialState: CataniaAddState = {
  color: undefined,
  isbn: undefined,
  error: null,
  isAdded: false,
  isAdding: false
}

export const cataniaAddState = createSlice({
  name: 'cataniaAdd',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: state => {
      state.isAdding = true
      state.isAdded = false
    },
    added: state => {
      state.isAdded = true
      state.isAdding = false
    },
    addingError: (state, action: PayloadAction<Error>) => {
      state.isAdded = false
      state.isAdding = false
      state.error = action.payload
    },
    setIsbnOrColor: (
      state,
      action: PayloadAction<{data: number; isColorSearch: boolean}>
    ) => {
      const {data, isColorSearch} = action.payload
      if (isColorSearch) {
        state.color = data
      } else {
        state.isbn = data
      }
    },
    reset: state => {
      state.color = initialState.color
      state.isbn = initialState.isbn
      state.error = initialState.error
      state.isAdded = initialState.isAdded
      state.isAdding = initialState.isAdding
    }
  }
})

export const {add, added, addingError, reset, setIsbnOrColor} =
  cataniaAddState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColor = (state: RootState) => state.cataniaAdd.color
export const selectIsbn = (state: RootState) => state.cataniaAdd.isbn
export const selectIsAdded = (state: RootState) => state.cataniaAdd.isAdded
export const selectIsAdding = (state: RootState) => state.cataniaAdd.isAdding
export const selectError = (state: RootState) => state.cataniaAdd.error

export default cataniaAddState.reducer
