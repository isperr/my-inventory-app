import {createResultsSlice} from '../../utils/results/slice'

export const cottonQuickPrintState = createResultsSlice('cottonQuickPrint')

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
} = cottonQuickPrintState.actions

export default cottonQuickPrintState.reducer
