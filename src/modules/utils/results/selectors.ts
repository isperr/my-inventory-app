import {createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../../utils/store'
import {ResolveStateReturnType, ResolveStateDataReturnType} from '../../types'

export type ResultsState = Pick<
  RootState,
  // add all search modules here in order for the util to work
  | 'catania'
  | 'cataniaColor'
  | 'cottonQuick'
  | 'cottonQuickPrint'
  | 'funnyUni'
  | 'kingCotton'
  | 'lisaPremiumUni'
  | 'samt'
  | 'samtBaby'
  | 'dolphinBaby'
  | 'babySnuggle'
>

export const createResultsSelectors = (name: keyof ResultsState) => {
  // Other code such as selectors can use the imported `RootState` type
  const selectData = (state: RootState) => state[name].data
  const selectEntities = (state: RootState) => state[name].entities
  const selectIsActivated = (state: RootState) => state[name].isActivated
  const selectIsLoaded = (state: RootState) => state[name].isLoaded
  const selectIsLoading = (state: RootState) => state[name].isLoading
  const selectError = (state: RootState) => state[name].error
  const selectIsUpdated = (state: RootState) => state[name].isUpdated
  const selectIsUpdating = (state: RootState) => state[name].isUpdating
  const selectUpdateError = (state: RootState) => state[name].updatingError

  // resolve selectors
  const selectIsResolved = (state: RootState) => state[name].isResolved
  const selectIsIdResolved = (id?: string): ResolveStateReturnType =>
    createSelector(
      [(state: RootState) => selectIsResolved(state)],
      resolvedArr => (id ? resolvedArr.includes(id) : false)
    )
  const selectIsResolving = (state: RootState) => state[name].isResolving
  const selectIsIdResolving = (id?: string): ResolveStateReturnType =>
    createSelector(
      [(state: RootState) => selectIsResolving(state)],
      resolvingArr => (id ? resolvingArr.includes(id) : false)
    )
  const selectResolveError = (state: RootState) => state[name].resolvingError
  const selectHasResolveError = (id?: string): ResolveStateReturnType =>
    createSelector(
      [(state: RootState) => selectResolveError(state)],
      resolveError => (id ? Boolean(resolveError[id]) : false)
    )
  const selectResolveData = (id?: string): ResolveStateDataReturnType =>
    createSelector([(state: RootState) => selectEntities(state)], entities =>
      id ? entities[id] : null
    )

  const selectIsUpdatingType = (type?: string): ResolveStateReturnType =>
    createSelector(
      [(state: RootState) => selectIsUpdating(state)],
      isUpdating => isUpdating === type
    )

  return {
    selectData,
    selectEntities,
    selectError,
    selectIsActivated,
    selectIsLoaded,
    selectIsLoading,
    selectIsUpdated,
    selectIsUpdating,
    selectUpdateError,
    // resolving selectors
    selectIsResolved,
    selectIsResolving,
    selectResolveError,
    selectHasResolveError,
    selectIsIdResolved,
    selectIsIdResolving,
    selectIsUpdatingType,
    selectResolveData
  }
}
