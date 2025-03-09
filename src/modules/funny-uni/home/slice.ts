import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const funnyUniHomeState = createHomeSlice('funnyUniHome')

export const {load, loaded, loadingError, insert} = funnyUniHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('funnyUniHome')

export default funnyUniHomeState.reducer
