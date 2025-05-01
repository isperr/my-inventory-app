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
export const selectIsEditMode = (state: RootState) =>
  state.finishedItems.isEditMode
export const selectUpdatingError = (state: RootState) =>
  state.finishedItems.updatingError
export const selectIsUpdated = (state: RootState) =>
  state.finishedItems.isUpdated
export const selectIsUpdating = (state: RootState) =>
  state.finishedItems.isUpdating
export const selectDeleteError = (state: RootState) =>
  state.finishedItems.deleteError
export const selectIsDeleted = (state: RootState) =>
  state.finishedItems.isDeleted
export const selectIsDeleting = (state: RootState) =>
  state.finishedItems.isDeleting

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
