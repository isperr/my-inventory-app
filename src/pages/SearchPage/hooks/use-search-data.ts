import {useCallback} from 'react'

import {onResolveDataByGivenData} from '../../../hooks/use-resolve'
import {setIsbnOrColor} from '../../../modules/wool/add/slice'
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

  const {load, loaded, loadingError, resolved} = getActions(collection)
  const {data, hasError, hasNoData, isLoaded, isLoading} =
    useSearchDataState(collection)

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
        dispatch(setIsbnOrColor({data: num, isColorSearch}))
      } catch (error) {
        dispatch(loadingError(error as Error))
      }
    },
    [collection]
  )

  return {
    data,
    hasError,
    hasNoData,
    isLoaded,
    isLoading,
    onLoadData
  }
}
