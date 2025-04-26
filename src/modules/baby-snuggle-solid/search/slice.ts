import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const babySnuggleSearchState = createSearchSlice('babySnuggleSearch')

export const {load, loaded, loadingError, reset} =
  babySnuggleSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('babySnuggleSearch')

export default babySnuggleSearchState.reducer
