import {createHomeSelectors} from '../../utils/home/selectors'
import {createHomeSlice} from '../../utils/home/slice'

export const dolphinBabyHomeState = createHomeSlice('dolphinBabyHome')

export const {load, loaded, loadingError, insert} = dolphinBabyHomeState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectData,
  selectEntities,
  selectError,
  selectIsLoaded,
  selectIsLoading
} = createHomeSelectors('dolphinBabyHome')

export default dolphinBabyHomeState.reducer
