import {createResultsSlice} from '../../utils/results/slice'

export const kingCottonState = createResultsSlice('kingCotton')

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
} = kingCottonState.actions

export default kingCottonState.reducer
