import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {WoolDocumentData, WoolEntityType} from '../../types'

// Define a type for the slice state
type HomeState = {
  data: WoolDocumentData[]
  entities: WoolEntityType
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
}

// Define the initial state using that type
const initialState: HomeState = {
  data: [],
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false
}

export const createHomeSlice = (name: string) =>
  createSlice({
    name,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      load: state => {
        state.isLoading = true
        state.isLoaded = false
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
      },
      loadingError: (state, action: PayloadAction<Error>) => {
        state.isLoaded = false
        state.isLoading = false
        state.error = action.payload
      },
      insert: (state, action: PayloadAction<WoolDocumentData>) => {
        if (state.isLoaded) {
          // add data to state and sort
          const tempData = [...state.data, action.payload].sort(
            (itemA, itemB) => itemA.color - itemB.color
          )
          // remove one item so there are only 3 items preloaded on home-page
          tempData.pop()
          // update data in state
          state.data = tempData
          state.entities[action.payload.color] = action.payload
        }
      }
    }
  })
