import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const cottonQuickSearchState = createSearchSlice('cottonQuickSearch')

export const {load, loaded, loadingError, reset} =
  cottonQuickSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('cottonQuickSearch')

export default cottonQuickSearchState.reducer
