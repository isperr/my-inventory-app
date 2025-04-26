import {createResultsSlice} from '../../utils/results/slice'

export const babySnuggleState = createResultsSlice('babySnuggle')

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
} = babySnuggleState.actions

export default babySnuggleState.reducer
