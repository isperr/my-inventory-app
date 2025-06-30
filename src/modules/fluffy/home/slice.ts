import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const fluffyHomeState = createHomeSlice('fluffyHome')

export const {load, loaded, loadingError, insert} = fluffyHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('fluffyHome')

export default fluffyHomeState.reducer
