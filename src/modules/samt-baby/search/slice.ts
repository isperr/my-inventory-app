import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const samtBabySearchState = createSearchSlice('samtBabySearch')

export const {load, loaded, loadingError, reset} = samtBabySearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('samtBabySearch')

export default samtBabySearchState.reducer
