import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {onLoad} from '../../../hooks/finished-items/use-load'
import {
  load,
  loaded,
  loadingError
} from '../../../modules/finished-items/results/slice'
import {
  selectData,
  selectError,
  selectIsLoaded,
  selectIsLoading
} from '../../../modules/finished-items/results/selectors'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {getToastConfig} from '../../../utils/toast/get-toast-config'

export const useLoadData = () => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLoadData = useCallback(async () => {
    try {
      dispatch(load())
      const data = await onLoad()
      dispatch(loaded(data))
    } catch (error) {
      dispatch(loadingError(error as Error))
      notifications.show(
        'Beim Laden der Liste ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [dispatch])

  return {data, handleLoadData, hasError: Boolean(error), isLoaded, isLoading}
}
