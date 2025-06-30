import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const fluffySearchState = createSearchSlice('fluffySearch')

export const {load, loaded, loadingError, reset} = fluffySearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('fluffySearch')

export default fluffySearchState.reducer
