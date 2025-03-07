import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const cataniaHomeState = createHomeSlice('cataniaHome')

export const {load, loaded, loadingError, insert} = cataniaHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('cataniaHome')

export default cataniaHomeState.reducer
