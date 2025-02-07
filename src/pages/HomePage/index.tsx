import {useCallback, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router'
import {useNotifications} from '@toolpad/core'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'

import Button from '../../atoms/Button'
import FloatingButton from '../../atoms/FloatingButton'
import Logo from '../../atoms/Logo'
import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'
import {onLoadPreviewData} from '../../hooks/catania/load-data'
import {
  load,
  loaded,
  loadingError,
  selectData,
  selectError,
  selectIsLoaded,
  selectIsLoading
} from '../../modules/catania/home/slice'
import PageTemplate from '../../templates/Page'
import {getToastConfig} from '../../utils/toast/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

import CataniaPreview from './components/CataniaPreview'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const notifications = useNotifications()
  const navigate = useNavigate()

  const {onLogout, username} = useFirebaseAuth()

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const effectRan = useRef<boolean>(false)

  const handleLoadData = useCallback(async () => {
    try {
      dispatch(load())
      const data = await onLoadPreviewData()
      dispatch(loaded(data))
    } catch (error) {
      dispatch(loadingError(error as Error))
      notifications.show(
        'Beim Laden der Catania-Liste ist leider ein Fehler aufgetreten.',
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
    <PageTemplate>
      <Logo>Willkommen zurück{username ? `, ${username}` : ''}!</Logo>
      <IconButton
        aria-label="logout"
        className="absolute right-0 top-2"
        size="large"
        color="secondary"
        onClick={onLogout}
      >
        <LogoutIcon fontSize="inherit" />
      </IconButton>

      <div className="px-4">
        <CataniaPreview
          data={data}
          hasError={Boolean(error)}
          isLoading={isLoading}
        />
        <div className="w-auto flex px-4">
          <Button
            className="w-full"
            onClick={() => {
              navigate('/catania')
            }}
            size="small"
          >
            Sammlung ansehen
          </Button>
        </div>
      </div>

      <FloatingButton ariaLabel="scan" icon="scan" path="/scan" />
    </PageTemplate>
  )
}

export default HomePage
