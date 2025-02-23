import {useCallback, useEffect, useRef} from 'react'
import {twMerge} from 'tailwind-merge'
import Typography from '@mui/material/Typography'
import {useNotifications} from '@toolpad/core/useNotifications'

import FloatingButton from '../../atoms/FloatingButton'
import {onLoadData} from '../../hooks/catania/load-data'
import {
  load,
  loaded,
  loadingError,
  setIsActivated
} from '../../modules/catania/results/slice'
import {
  selectIsActivated,
  selectIsLoaded,
  selectIsLoading
} from '../../modules/catania/results/selectors'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import PageTemplate from '../../templates/Page'

import List from './components/List'
import {getToastConfig} from '../../utils/toast/get-toast-config'
import {FormControlLabel, Switch} from '@mui/material'

const CataniaListPage = () => {
  const notifications = useNotifications()

  const dispatch = useAppDispatch()
  const activated = useAppSelector(selectIsActivated)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const effectRan = useRef<boolean>(false)

  const handleLoadData = useCallback(
    async (isActivated: boolean) => {
      try {
        dispatch(load())
        const data = await onLoadData(isActivated)
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
    const updatedActived = !activated
    dispatch(setIsActivated(updatedActived))
    handleLoadData(updatedActived)
  }, [activated, dispatch, handleLoadData])

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData(activated)
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
      <FormControlLabel
        className="px-4"
        control={
          <Switch
            checked={activated}
            onChange={handleActivatedChange}
            inputProps={{'aria-label': 'controlled'}}
          />
        }
        label={activated ? 'in der Sammlung' : 'noch nicht in der Sammlung'}
        value={activated}
      />
      <List />
      <FloatingButton />
    </PageTemplate>
  )
}

export default CataniaListPage
