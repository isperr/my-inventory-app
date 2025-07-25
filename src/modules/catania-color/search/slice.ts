import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const cataniaColorSearchState = createSearchSlice('cataniaColorSearch')

export const {load, loaded, loadingError, reset} =
  cataniaColorSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('cataniaColorSearch')

export default cataniaColorSearchState.reducer
