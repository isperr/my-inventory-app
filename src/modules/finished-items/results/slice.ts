import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ItemDocumentData, ItemEntityType} from '../../types'

type FinishedItemResultsState = {
  data: ItemDocumentData[]
  entities: ItemEntityType
  error: Error | null
  isEditMode: boolean
  isLoaded: boolean
  isLoading: boolean
  isResolved: Array<string>
  isResolving: Array<string>
  resolvingError: {
    [k: string]: Error | null
  }
}

const initialState: FinishedItemResultsState = {
  data: [],
  entities: {},
  error: null,
  isEditMode: false,
  isLoaded: false,
  isLoading: false,
  isResolved: [],
  isResolving: [],
  resolvingError: {}
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
      const resolved: Array<string> = []
      state.data = action.payload

      state.entities = action.payload.reduce((acc, item) => {
        resolved.push(item.id.toString())
        return {...acc, [item.id]: item}
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
    insert: (state, action: PayloadAction<ItemDocumentData>) => {
      if (!state.isLoaded) {
        return
      }
      const tempData = [...state.data, action.payload]
      // update data in state as sorted array by name
      state.data = tempData.sort((itemA, itemB) =>
        itemA.name.localeCompare(itemB.name)
      )
      state.entities[action.payload.id] = action.payload
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
      action: PayloadAction<{
        data: ItemDocumentData | undefined
        id: string
      }>
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
    toggleEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload
    }
  }
})

export const {
  load,
  loaded,
  loadingError,
  insert,
  resolve,
  resolved,
  resolvingError,
  toggleEditMode
} = finishedItemResultsSlice.actions

export default finishedItemResultsSlice.reducer
