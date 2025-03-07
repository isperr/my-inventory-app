import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const cataniaSearchState = createSearchSlice('cataniaSearch')

export const {load, loaded, loadingError, reset} = cataniaSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('cataniaSearch')

export default cataniaSearchState.reducer
