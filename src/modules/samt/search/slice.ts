import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const samtSearchState = createSearchSlice('samtSearch')

export const {load, loaded, loadingError, reset} = samtSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('samtSearch')

export default samtSearchState.reducer
