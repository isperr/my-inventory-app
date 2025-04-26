import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const babySnuggleHomeState = createHomeSlice('babySnuggleHome')

export const {load, loaded, loadingError, insert} = babySnuggleHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('babySnuggleHome')

export default babySnuggleHomeState.reducer
