import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ItemCategory, ItemDocumentData, ItemEntityType} from '../../types'

type FinishedItemResultsState = {
  categoryFilter: Array<ItemCategory>
  data: ItemDocumentData[]
  deleteError: Error | null
  entities: ItemEntityType
  error: Error | null
  isDeleted: boolean
  isDeleting: boolean
  isEditMode: boolean
  isLoaded: boolean
  isLoading: boolean
  isResolved: Array<string>
  isResolving: Array<string>
  isUpdating: boolean
  isUpdated: boolean
  resolvingError: {
    [k: string]: Error | null
  }
  updatingError: Error | null
}

const initialState: FinishedItemResultsState = {
  categoryFilter: ['keychain', 'plushy', 'regular'],
  data: [],
  deleteError: null,
  entities: {},
  error: null,
  isDeleted: false,
  isDeleting: false,
  isEditMode: false,
  isLoaded: false,
  isLoading: false,
  isResolved: [],
  isResolving: [],
  isUpdated: false,
  isUpdating: false,
  resolvingError: {},
  updatingError: null
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
    },
    update: state => {
      state.isUpdating = true
      state.isUpdated = false
    },
    updated: (
      state,
      action: PayloadAction<{
        data: Partial<ItemDocumentData>
        id: string
      }>
    ) => {
      const {data, id} = action.payload

      const idx = state.data.findIndex(it => it.id === id)
      // only try to update data if items in list are loaded
      if (idx !== -1) {
        state.data[idx] = {...state.data[idx], ...data}
      }

      // always update data in entities
      state.entities[id] = {...state.entities[id], ...data}

      state.isUpdating = false
      state.isUpdated = true
    },
    updateError: (state, action: PayloadAction<Error>) => {
      state.isUpdating = false
      state.isUpdated = false
      state.updatingError = action.payload
    },
    resetUpdate: state => {
      state.isUpdated = false
      state.isUpdating = false
      state.updatingError = null
    },
    deleteItem: state => {
      state.isDeleting = true
      state.isDeleted = false
    },
    deletedItem: (state, action: PayloadAction<string>) => {
      const id = action.payload

      // only remove item from list if it was actually loaded
      if (state.isLoaded) {
        state.data = state.data.filter(it => it.id !== id)
      }
      // always update data in entities
      state.entities = Object.keys(state.entities).reduce((acc, key) => {
        const item = state.entities[key]
        if (item.id === id) {
          return acc
        }
        return {...acc, [key]: item}
      }, {})

      state.isDeleting = false
      state.isDeleted = true
    },
    deleteItemError: (state, action: PayloadAction<Error>) => {
      state.isDeleting = false
      state.isDeleted = false
      state.deleteError = action.payload
    },
    resetDeleteItem: state => {
      state.isDeleted = false
      state.isDeleting = false
      state.deleteError = null
    },
    setCategoryFilter: (state, action: PayloadAction<Array<ItemCategory>>) => {
      state.categoryFilter = action.payload
    }
  }
})

export const {
  deletedItem,
  deleteItem,
  deleteItemError,
  insert,
  load,
  loaded,
  loadingError,
  resetDeleteItem,
  resetUpdate,
  resolve,
  resolved,
  resolvingError,
  setCategoryFilter,
  toggleEditMode,
  update,
  updated,
  updateError
} = finishedItemResultsSlice.actions

export default finishedItemResultsSlice.reducer
