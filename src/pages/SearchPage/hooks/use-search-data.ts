import {useCallback} from 'react'

import {onResolveDataByGivenData} from '../../../hooks/use-resolve'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {CollectionType} from '../../HomePage/types'

import {getActions, getSelectors} from '../utils/get-slice'

export const useSearchDataState = (collection: CollectionType) => {
  const {selectData, selectError, selectIsLoaded, selectIsLoading} =
    getSelectors(collection)

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)
  const hasError = Boolean(error)

  return {
    data,
    hasError,
    hasNoData: !hasError && isLoaded && !data.length,
    isLoaded,
    isLoading
  }
}

export const useSearchData = (collection: CollectionType) => {
  const dispatch = useAppDispatch()

  const {load, loaded, loadingError, resolved, reset} = getActions(collection)
  const state = useSearchDataState(collection)

  const onLoadData = useCallback(
    async ({isColorSearch, num}: {isColorSearch: boolean; num: number}) => {
      try {
        dispatch(load())
        const searchData = await onResolveDataByGivenData({
          collectionName: collection,
          data: num,
          isColorSearch
        })
        if (searchData) {
          dispatch(
            resolved({data: searchData, id: searchData.color.toString()})
          )
        }
        dispatch(loaded(searchData))
      } catch (error) {
        dispatch(loadingError(error as Error))
      }
    },
    [collection]
  )

  const onReset = useCallback(() => {
    dispatch(reset())
  }, [])

  return {
    ...state,
    onLoadData,
    onReset
  }
}
