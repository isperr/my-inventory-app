import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const dolphinBabySearchState = createSearchSlice('dolphinBabySearch')

export const {load, loaded, loadingError, reset} =
  dolphinBabySearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('dolphinBabySearch')

export default dolphinBabySearchState.reducer
