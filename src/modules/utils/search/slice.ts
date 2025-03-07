import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {WoolDocumentData} from '../../types'

// Define a type for the slice state
type SearchState = {
  data: WoolDocumentData[]
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
}

// Define the initial state using that type
const initialState: SearchState = {
  data: [],
  error: null,
  isLoaded: false,
  isLoading: false
}

export const createSearchSlice = (name: string) =>
  createSlice({
    name,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      load: state => {
        state.data = []
        state.isLoading = true
        state.isLoaded = false
      },
      loaded: (state, action: PayloadAction<WoolDocumentData | undefined>) => {
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
