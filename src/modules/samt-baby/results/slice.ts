import {createResultsSlice} from '../../utils/results/slice'

export const samtBabyState = createResultsSlice('samtBaby')

export const {
  load,
  loaded,
  loadingError,
  insert,
  resolve,
  resolved,
  resolvingError,
  update,
  updateError,
  updated,
  setIsActivated
} = samtBabyState.actions

export default samtBabyState.reducer
