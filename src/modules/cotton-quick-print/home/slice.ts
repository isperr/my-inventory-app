import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const cottonQuickPrintHomeState = createHomeSlice('cottonQuickPrintHome')

export const {load, loaded, loadingError, insert} =
  cottonQuickPrintHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('cottonQuickPrintHome')

export default cottonQuickPrintHomeState.reducer
