import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {WoolDocumentData, WoolEntityType, UpdatingType} from '../../types'

// Define a type for the slice state
type ResultsState = {
  data: WoolDocumentData[]
  entities: WoolEntityType
  error: Error | null
  isActivated: boolean
  isLoaded: boolean
  isLoading: boolean
  isResolved: Array<string>
  isResolving: Array<string>
  isUpdating: UpdatingType | null
  isUpdated: boolean
  resolvingError: {
    [k: string]: Error | null
  }
  updatingError: Error | null
}

// Define the initial state using that type
const initialState: ResultsState = {
  data: [],
  entities: {},
  error: null,
  isActivated: true,
  isLoaded: false,
  isLoading: false,
  isResolved: [],
  isResolving: [],
  isUpdated: false,
  isUpdating: null,
  resolvingError: {},
  updatingError: null
}

export const createResultsSlice = (name: string) =>
  createSlice({
    name,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      load: state => {
        state.isLoading = true
        state.isLoaded = false
        state.data = []
        state.error = null
      },
      loaded: (state, action: PayloadAction<WoolDocumentData[]>) => {
        const resolved: Array<string> = []
        state.data = action.payload

        state.entities = action.payload.reduce((acc, item) => {
          resolved.push(item.color.toString())
          return {...acc, [item.color]: item}
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
      insert: (state, action: PayloadAction<WoolDocumentData>) => {
        // do not insert item (by default activated) if it loaded data is inactive data
        if (
          state.isLoaded &&
          action.payload.isActivated === state.isActivated
        ) {
          const tempData = [...state.data, action.payload]
          // update data in state as sorted array by color
          state.data = tempData.sort(
            (itemA, itemB) => itemA.color - itemB.color
          )
          state.entities[action.payload.color] = action.payload
        }
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
          data: WoolDocumentData | undefined
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
      update: (state, action: PayloadAction<UpdatingType | null>) => {
        state.isUpdating = action.payload
        state.isUpdated = false
      },
      updated: (
        state,
        action: PayloadAction<{
          field: keyof WoolDocumentData
          id: string
          value: number | boolean
        }>
      ) => {
        const {field, id, value} = action.payload

        const idx = state.data.findIndex(it => it.color === id)
        // only try to update data if items in list are loaded
        if (idx !== -1) {
          const newData = {...state.data[idx], [field]: value}
          if (newData.isActivated !== state.isActivated) {
            state.data.splice(idx, 1)
          } else {
            state.data[idx] = newData
          }
        }

        // always update data in entities
        state.entities[id] = {...state.entities[id], [field]: value}

        state.isUpdating = null
        state.isUpdated = true
      },
      updateError: (state, action: PayloadAction<Error>) => {
        state.isUpdating = null
        state.isUpdated = false
        state.updatingError = action.payload
      },
      setIsActivated: (state, action: PayloadAction<boolean>) => {
        state.isActivated = action.payload
      }
    }
  })
