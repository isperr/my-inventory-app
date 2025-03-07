import {createResultsSlice} from '../../utils/results/slice'

export const cottonQuickState = createResultsSlice('cottonQuick')

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
} = cottonQuickState.actions

export default cottonQuickState.reducer
