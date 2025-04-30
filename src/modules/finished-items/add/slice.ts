import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../utils/store'

type AddItemState = {
  error: Error | null
  isAdded: boolean
  isAdding: boolean
}

const initialState: AddItemState = {
  error: null,
  isAdded: false,
  isAdding: false
}

const addItemSlice = createSlice({
  name: 'finishedItemsAdd',
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
    reset: state => {
      state.error = initialState.error
      state.isAdded = initialState.isAdded
      state.isAdding = initialState.isAdding
    }
  }
})

export const selectIsAdded = (state: RootState) =>
  state.finishedItemsAdd.isAdded
export const selectIsAdding = (state: RootState) =>
  state.finishedItemsAdd.isAdding
export const selectError = (state: RootState) => state.finishedItemsAdd.error

export const {add, added, addingError, reset} = addItemSlice.actions

export default addItemSlice.reducer
