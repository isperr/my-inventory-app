import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const lisaPremiumUniSearchState = createSearchSlice(
  'lisaPremiumUniSearch'
)

export const {load, loaded, loadingError, reset} =
  lisaPremiumUniSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('lisaPremiumUniSearch')

export default lisaPremiumUniSearchState.reducer
