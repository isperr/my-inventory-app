import {useCallback, useEffect, useRef} from 'react'
import {twMerge} from 'tailwind-merge'
import Typography from '@mui/material/Typography'
import {useNotifications} from '@toolpad/core/useNotifications'

import FloatingButton from '../../atoms/FloatingButton'
import {onLoadData} from '../../hooks/catania/load-data'
import {load, loaded, loadingError} from '../../modules/catania/results/slice'
import {
  selectIsLoaded,
  selectIsLoading
} from '../../modules/catania/results/selectors'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import PageTemplate from '../../templates/Page'

import List from './components/List'
import {getToastConfig} from '../../utils/toast/get-toast-config'

const CataniaListPage = () => {
  const notifications = useNotifications()

  const dispatch = useAppDispatch()
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const effectRan = useRef<boolean>(false)

  const handleLoadData = useCallback(async () => {
    try {
      dispatch(load())
      const data = await onLoadData()
      dispatch(loaded(data))
    } catch (error) {
      dispatch(loadingError(error as Error))
      notifications.show(
        'Beim Laden der Liste ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [dispatch])

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  return (
    <PageTemplate
      className={twMerge(isLoading ? 'h-screen' : 'h-fit', 'gap-2')}
    >
      <Typography className="px-4 text-center" variant="h4">
        Schachermayr Catania
      </Typography>
      <List />
      <FloatingButton />
    </PageTemplate>
  )
}

export default CataniaListPage
