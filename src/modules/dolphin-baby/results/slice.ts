import {createResultsSlice} from '../../utils/results/slice'

export const dolphinBabyState = createResultsSlice('dolphinBaby')

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
} = dolphinBabyState.actions

export default dolphinBabyState.reducer
