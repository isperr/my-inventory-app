import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const cottonQuickPrintSearchState = createSearchSlice(
  'cottonQuickPrintSearch'
)

export const {load, loaded, loadingError, reset} =
  cottonQuickPrintSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('cottonQuickPrintSearch')

export default cottonQuickPrintSearchState.reducer
