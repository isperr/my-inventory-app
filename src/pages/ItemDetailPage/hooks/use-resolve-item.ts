import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {onResolve} from '../../../hooks/finished-items/use-resolve'
import {
  selectHasResolveError,
  selectIsIdResolved,
  selectIsIdResolving,
  selectResolveData
} from '../../../modules/finished-items/results/selectors'
import {
  resolve,
  resolved,
  resolvingError
} from '../../../modules/finished-items/results/slice'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

export const useResolveItem = (id?: string) => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

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
      const data = await onResolve(id)
      dispatch(resolved({data, id: id}))
    } catch (error) {
      dispatch(resolvingError({error: error as Error, id: id}))
      notifications.show(
        'Beim Laden der Wollknäuel-Daten ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [])

  return {
    hasResolveError,
    item,
    isResolved,
    isResolving,
    handleResolveData
  }
}
