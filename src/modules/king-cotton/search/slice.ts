import {createSearchSlice} from '../../utils/search/slice'
import {createSearchSelectors} from '../../utils/search/selectors'

export const kingCottonSearchState = createSearchSlice('kingCottonSearch')

export const {load, loaded, loadingError, reset} = kingCottonSearchState.actions

export const {selectData, selectError, selectIsLoaded, selectIsLoading} =
  createSearchSelectors('kingCottonSearch')

export default kingCottonSearchState.reducer
