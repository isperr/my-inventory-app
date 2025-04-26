import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ItemDocumentData, ItemEntityType} from '../../types'

type FinishedItemResultsState = {
  data: ItemDocumentData[]
  entities: ItemEntityType
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
}

const initialState: FinishedItemResultsState = {
  data: [],
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false
}

const finishedItemResultsSlice = createSlice({
  name: 'finishedItems',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
      state.data = []
      state.error = null
    },
    loaded: (state, action: PayloadAction<ItemDocumentData[]>) => {
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

export const {load, loaded, loadingError} = finishedItemResultsSlice.actions

export default finishedItemResultsSlice.reducer
