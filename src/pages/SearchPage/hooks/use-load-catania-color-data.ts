import {useCallback} from 'react'
import {
  load,
  loaded,
  loadingError,
  selectData,
  selectError,
  selectIsLoaded,
  selectIsLoading
} from '../../../modules/catania/search/slice'
import {resolved} from '../../../modules/catania/results/slice'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {setIsbnOrColor} from '../../../modules/catania/add/slice'
import {useNotifications} from '@toolpad/core'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {onResolveDataByGivenData} from '../../ColorPage/hooks/use-resolve'

export const useLoadCataniaColorData = () => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const onLoadData = useCallback(
    async ({isColorSearch, num}: {isColorSearch: boolean; num: number}) => {
      try {
        dispatch(load())
        const searchData = await onResolveDataByGivenData({
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
    []
  )

  return {
    data,
    hasError: Boolean(error),
    isLoaded,
    isLoading,
    onLoadData
  }
}
