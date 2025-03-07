import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const cottonQuickHomeState = createHomeSlice('cottonQuickHome')

export const {load, loaded, loadingError, insert} = cottonQuickHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('cottonQuickHome')

export default cottonQuickHomeState.reducer
