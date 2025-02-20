import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {CataniaDocumentData, CataniaEntityType} from '../results/slice'
import {RootState} from '../../../utils/store'

// Define a type for the slice state
interface CataniaHomeState {
  data: CataniaDocumentData[]
  entities: CataniaEntityType
  error: Error | null
  isLoaded: boolean
  isLoading: boolean
}

// Define the initial state using that type
const initialState: CataniaHomeState = {
  data: [],
  entities: {},
  error: null,
  isLoaded: false,
  isLoading: false
}

export const cataniaHomeState = createSlice({
  name: 'cataniaHome',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true
      state.isLoaded = false
    },
    loaded: (state, action: PayloadAction<CataniaDocumentData[]>) => {
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
    insert: (state, action: PayloadAction<CataniaDocumentData>) => {
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

export const {load, loaded, loadingError, insert} = cataniaHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.cataniaHome.data
export const selectEntities = (state: RootState) => state.cataniaHome.entities
export const selectIsLoaded = (state: RootState) => state.cataniaHome.isLoaded
export const selectIsLoading = (state: RootState) => state.cataniaHome.isLoading
export const selectError = (state: RootState) => state.cataniaHome.error

export default cataniaHomeState.reducer
