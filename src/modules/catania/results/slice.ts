import {createResultsSlice} from '../../utils/results/slice'

export const cataniaState = createResultsSlice('catania')

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
} = cataniaState.actions

export default cataniaState.reducer
