import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const samtHomeState = createHomeSlice('samtHome')

export const {load, loaded, loadingError, insert} = samtHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('samtHome')

export default samtHomeState.reducer
