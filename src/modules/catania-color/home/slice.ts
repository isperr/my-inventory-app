import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const cataniaColorHomeState = createHomeSlice('cataniaColorHome')

export const {load, loaded, loadingError, insert} =
  cataniaColorHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('cataniaColorHome')

export default cataniaColorHomeState.reducer
