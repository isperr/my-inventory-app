import {createResultsSlice} from '../../utils/results/slice'

export const cataniaColorState = createResultsSlice('cataniaColor')

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
} = cataniaColorState.actions

export default cataniaColorState.reducer
