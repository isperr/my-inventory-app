import {createResultsSlice} from '../../utils/results/slice'

export const fluffyState = createResultsSlice('fluffy')

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
} = fluffyState.actions

export default fluffyState.reducer
