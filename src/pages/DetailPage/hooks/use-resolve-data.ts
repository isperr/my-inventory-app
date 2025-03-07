import {useCallback} from 'react'

import {onResolveData} from '../../../hooks/use-resolve'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {CollectionType} from '../../HomePage/types'

import {getResolveActions, getResolveSelectors} from '../utils/get-slice'
import {useToasts} from './use-toats'

export const useResolveData = (collection: CollectionType, id?: string) => {
  const dispatch = useAppDispatch()
  const {resolveErrorToast} = useToasts()

  const {
    selectHasResolveError,
    selectIsIdResolved,
    selectIsIdResolving,
    selectResolveData
  } = getResolveSelectors(collection)
  const {resolve, resolved, resolvingError} = getResolveActions(collection)

  const item = useAppSelector(selectResolveData(id))
  const isResolved = useAppSelector(selectIsIdResolved(id))
  const isResolving = useAppSelector(selectIsIdResolving(id))
  const hasResolveError = useAppSelector(selectHasResolveError(id))

  const handleResolveData = useCallback(async () => {
    if (!id) {
      return
    }
    try {
      dispatch(resolve(id))
      const data = await onResolveData(id, collection)
      dispatch(resolved({data, id: id}))
    } catch (error) {
      dispatch(resolvingError({error: error as Error, id: id}))
      resolveErrorToast()
    }
  }, [collection])

  return {
    hasResolveError,
    item,
    isResolved,
    isResolving,
    handleResolveData
  }
}
