import {createSelector} from '@reduxjs/toolkit'

import {RootState} from '../../../utils/store'

import {
  ResolveStateDataReturnType,
  ResolveStateReturnType
} from '../../catania/types'

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.cataniaColor.data
export const selectEntities = (state: RootState) => state.cataniaColor.entities
export const selectIsActivated = (state: RootState) =>
  state.cataniaColor.isActivated
export const selectIsLoaded = (state: RootState) => state.cataniaColor.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.cataniaColor.isLoading
export const selectError = (state: RootState) => state.cataniaColor.error
export const selectIsUpdated = (state: RootState) =>
  state.cataniaColor.isUpdated
export const selectIsUpdating = (state: RootState) =>
  state.cataniaColor.isUpdating
export const selectUpdateError = (state: RootState) =>
  state.cataniaColor.updatingError

// resolve selectors
export const selectIsResolved = (state: RootState) =>
  state.cataniaColor.isResolved
export const selectIsIdResolved = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolved(state)],
    resolvedArr => (id ? resolvedArr.includes(id) : false)
  )
export const selectIsResolving = (state: RootState) =>
  state.cataniaColor.isResolving
export const selectIsIdResolving = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolving(state)],
    resolvingArr => (id ? resolvingArr.includes(id) : false)
  )
export const selectResolveError = (state: RootState) =>
  state.cataniaColor.resolvingError
export const selectHasResolveError = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectResolveError(state)],
    resolveError => (id ? Boolean(resolveError[id]) : false)
  )
export const selectResolveData = (id?: string): ResolveStateDataReturnType =>
  createSelector([(state: RootState) => selectEntities(state)], entities =>
    id ? entities[id] : null
  )

export const selectIsUpdatingType = (type?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsUpdating(state)],
    isUpdating => isUpdating === type
  )
