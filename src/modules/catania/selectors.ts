import {createSelector} from '@reduxjs/toolkit'
import {RootState} from '../../utils/store'
import {CataniaDocumentData} from './slice'

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.catania.data
export const selectEntities = (state: RootState) => state.catania.entities
export const selectIsLoaded = (state: RootState) => state.catania.isLoaded
export const selectIsLoading = (state: RootState) => state.catania.isLoading
export const selectError = (state: RootState) => state.catania.error
export const selectIsUpdated = (state: RootState) => state.catania.isUpdated
export const selectIsUpdating = (state: RootState) => state.catania.isUpdating
export const selectUpdateError = (state: RootState) =>
  state.catania.updatingError

// resolve selectors
type ResolveStateReturnType = (state: RootState) => boolean
type ResolveStateDataReturnType = (
  state: RootState
) => CataniaDocumentData | null

export const selectIsResolved = (state: RootState) => state.catania.isResolved
export const selectIsIdResolved = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolved(state)],
    resolvedArr => (id ? resolvedArr.includes(id) : false)
  )
export const selectIsResolving = (state: RootState) => state.catania.isResolving
export const selectIsIdResolving = (id?: string): ResolveStateReturnType =>
  createSelector(
    [(state: RootState) => selectIsResolving(state)],
    resolvingArr => (id ? resolvingArr.includes(id) : false)
  )
export const selectResolveError = (state: RootState) =>
  state.catania.resolvingError
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
