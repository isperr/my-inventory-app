import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core'

import {resolved} from '../../../modules/catania/results/slice'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {setIsbnOrColor} from '../../../modules/catania/add/slice'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {onResolveDataByGivenData} from '../../CataniaDetailPage/hooks/use-resolve'
import {CollectionType} from '../../HomePage/types'

import {getActions, getSelectors} from '../utils/get-slice'

export const useLoadCataniaColorData = (collection: CollectionType) => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const {load, loaded, loadingError} = getActions(collection)
  const {selectData, selectError, selectIsLoaded, selectIsLoading} =
    getSelectors(collection)

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
        notifications.show(
          'Beim Suchen des Wollknäuels ist leider ein Fehler aufgetreten.',
          getToastConfig({})
        )
      }
    },
    [collection]
  )

  const hasError = Boolean(error)
  return {
    data,
    hasError,
    hasNoData: !hasError && isLoaded && !data.length,
    isLoaded,
    isLoading,
    onLoadData
  }
}
