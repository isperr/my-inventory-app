import {RootState} from '../../../utils/store'

export const selectData = (state: RootState) => state.finishedItems.data
export const selectEntities = (state: RootState) => state.finishedItems.entities
export const selectError = (state: RootState) => state.finishedItems.error
export const selectIsLoaded = (state: RootState) => state.finishedItems.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.finishedItems.isLoading
