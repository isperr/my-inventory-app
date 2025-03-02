import {useCallback} from 'react'

import {onLoadPreviewData} from '../../../hooks/catania/load-data'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

import {getActions, getSelectors} from '../utils/get-slice'
import {CollectionType} from '../types'

export const useLoadCataniaData = (collection: CollectionType) => {
  const dispatch = useAppDispatch()

  const {load, loaded, loadingError} = getActions(collection)
  const {selectData, selectError, selectIsLoaded, selectIsLoading} =
    getSelectors(collection)

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLoadData = useCallback(async () => {
    try {
      dispatch(load())
      const data = await onLoadPreviewData(collection)
      dispatch(loaded(data))
    } catch (error) {
      dispatch(loadingError(error as Error))
    }
  }, [dispatch])

  return {
    data,
    error,
    isLoaded,
    isLoading,
    handleLoadData
  }
}
