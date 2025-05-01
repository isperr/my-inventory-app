import {createSlice, PayloadAction} from '@reduxjs/toolkit'

// Define a type for the slice state
type AddState = {
  color?: number
  isbn?: number
  error: Error | null
  isAdded: boolean
  isAdding: boolean
}

// Define the initial state using that type
const initialState: AddState = {
  color: undefined,
  isbn: undefined,
  error: null,
  isAdded: false,
  isAdding: false
}

export const createAddSlice = (name: string) =>
  createSlice({
    name,
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
          state.isbn = undefined
        } else {
          state.isbn = data
          state.color = undefined
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
