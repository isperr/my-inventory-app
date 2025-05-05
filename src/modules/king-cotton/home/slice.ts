import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const kingCottonHomeState = createHomeSlice('kingCottonHome')

export const {load, loaded, loadingError, insert} = kingCottonHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('kingCottonHome')

export default kingCottonHomeState.reducer
