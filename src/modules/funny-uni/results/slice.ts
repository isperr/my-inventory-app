import {createResultsSlice} from '../../utils/results/slice'

export const funnyUniState = createResultsSlice('funnyUni')

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
} = funnyUniState.actions

export default funnyUniState.reducer
