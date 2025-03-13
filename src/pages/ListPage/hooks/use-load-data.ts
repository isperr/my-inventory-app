import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {CollectionType} from '../../HomePage/types'
import {onLoadData} from '../../../hooks/use-load'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {getToastConfig} from '../../../utils/toast/get-toast-config'

import {getActions, getSelectors} from '../utils/get-slice'

export const useLoadData = (collection: CollectionType) => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const {load, loaded, loadingError, setIsActivated} = getActions(collection)
  const {
    selectData,
    selectError,
    selectIsActivated,
    selectIsLoaded,
    selectIsLoading
  } = getSelectors(collection)

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isActivated = useAppSelector(selectIsActivated)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLoadData = useCallback(
    async (isActivated: boolean) => {
      try {
        dispatch(load())
        const data = await onLoadData(isActivated, collection)
        dispatch(loaded(data))
      } catch (error) {
        dispatch(loadingError(error as Error))
        notifications.show(
          'Beim Laden der Liste ist leider ein Fehler aufgetreten.',
          getToastConfig({})
        )
      }
    },
    [dispatch]
  )

  const handleActivatedChange = useCallback(() => {
    const updatedIsActivated = !isActivated
    dispatch(setIsActivated(updatedIsActivated))
    handleLoadData(updatedIsActivated)
  }, [isActivated, dispatch, handleLoadData])

  return {
    data,
    error,
    isActivated,
    isLoaded,
    isLoading,
    handleActivatedChange,
    handleLoadData
  }
}
