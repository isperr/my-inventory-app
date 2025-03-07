import {useCallback, useEffect} from 'react'

import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {onResolveDataByGivenData} from '../../../hooks/use-resolve'
import {CollectionType} from '../../HomePage/types'

import {getActions, getAddActions, getSelectors} from '../utils/get-slice'

export const useSearchData = (collection: CollectionType) => {
  const dispatch = useAppDispatch()

  const {load, loaded, loadingError, resolved} = getActions(collection)
  const {selectData, selectError, selectIsLoaded, selectIsLoading} =
    getSelectors(collection)
  const {setIsbnOrColor, reset} = getAddActions(collection)

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

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

  const hasError = Boolean(error)

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  return {
    data,
    hasError,
    hasNoData: !hasError && isLoaded && !data.length,
    isLoaded,
    isLoading,
    onLoadData
  }
}
