import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const funnyUniSearchState = createSearchSlice('funnyUniSearch')

export const {load, loaded, loadingError, reset} = funnyUniSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('funnyUniSearch')

export default funnyUniSearchState.reducer
