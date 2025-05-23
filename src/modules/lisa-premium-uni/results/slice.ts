import {createResultsSlice} from '../../utils/results/slice'

export const lisaPremiumUniState = createResultsSlice('lisaPremiumUni')

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
} = lisaPremiumUniState.actions

export default lisaPremiumUniState.reducer
