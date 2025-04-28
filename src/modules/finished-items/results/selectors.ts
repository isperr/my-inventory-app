import {createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../../utils/store'
import {
  ResolveStateItemDataReturnType,
  ResolveStateReturnType
} from '../../types'

export const selectData = (state: RootState) => state.finishedItems.data
export const selectEntities = (state: RootState) => state.finishedItems.entities
export const selectError = (state: RootState) => state.finishedItems.error
export const selectIsLoaded = (state: RootState) => state.finishedItems.isLoaded
export const selectIsLoading = (state: RootState) =>
  state.finishedItems.isLoading

// resolve selectors
const selectIsResolved = (state: RootState) => state.finishedItems.isResolved
export const selectIsIdResolved = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolved(state)],
    resolvedArr => (id ? resolvedArr.includes(id) : false)
  )
const selectIsResolving = (state: RootState) => state.finishedItems.isResolving
export const selectIsIdResolving = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolving(state)],
    resolvingArr => (id ? resolvingArr.includes(id) : false)
  )
const selectResolveError = (state: RootState) =>
  state.finishedItems.resolvingError
export const selectHasResolveError = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectResolveError(state)],
    resolveError => (id ? Boolean(resolveError[id]) : false)
  )
export const selectResolveData = (
  id?: string
): ResolveStateItemDataReturnType =>
  createSelector([(state: RootState) => selectEntities(state)], entities =>
    id ? entities[id] : null
  )
