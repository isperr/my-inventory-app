import {useCallback, useEffect, useRef} from 'react'
import {twMerge} from 'tailwind-merge'
import {toast} from 'react-toastify'
import Typography from '@mui/material/Typography'

import FloatingButton from '../../atoms/FloatingButton'
import {load, loaded, loadingError} from '../../modules/catania/slice'
import {selectIsLoaded, selectIsLoading} from '../../modules/catania/selectors'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import PageTemplate from '../../templates/Page'

import WoolList from './components/WoolList'
import {onLoadData} from './hooks/use-data'

const ListPage = () => {
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
      toast.error('Beim Laden der Liste ist leider ein Fehler aufgetreten.')
    }
  }, [])

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
        Schachermayr Catania Sammlung
      </Typography>
      <WoolList />
      <FloatingButton />
    </PageTemplate>
  )
}

export default ListPage
