import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const lisaPremiumUniHomeState = createHomeSlice('lisaPremiumUniHome')

export const {load, loaded, loadingError, insert} =
  lisaPremiumUniHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('lisaPremiumUniHome')

export default lisaPremiumUniHomeState.reducer
