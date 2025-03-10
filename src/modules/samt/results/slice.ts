import {createResultsSlice} from '../../utils/results/slice'

export const samtState = createResultsSlice('samt')

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
} = samtState.actions

export default samtState.reducer
