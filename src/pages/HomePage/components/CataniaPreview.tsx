import {useCallback, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import IconButton from '@mui/material/IconButton'
import {useNotifications} from '@toolpad/core'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material'

import Button from '../../../atoms/Button'
import {onLoadPreviewData} from '../../../hooks/catania/load-data'
import {
  load,
  loaded,
  loadingError,
  selectData,
  selectIsLoaded,
  selectIsLoading
} from '../../../modules/catania/home/slice'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {getToastConfig} from '../../../utils/toast/get-toast-config'

const CataniaPreview = () => {
  const notifications = useNotifications()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const data = useAppSelector(selectData)
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
    <div className="px-4">
      <List
        dense
        subheader={
          <ListSubheader className="leading-snug font-normal">
            Schachermayr Catania Sammlung
          </ListSubheader>
        }
      >
        {data.map(item => (
          <ListItem
            key={`preview-item-${item.color}`}
            className="px-0"
            secondaryAction={
              <IconButton
                color="primary"
                edge="end"
                aria-label="more"
                onClick={() => {
                  navigate(`/catania/${item.color}`)
                }}
              >
                <ArrowCircleRightIcon fontSize="medium" />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={() => {
                navigate(`/catania/${item.color}`)
              }}
            >
              <ListItemText
                className="text-[#6d5b54]"
                primary={`${item.color}, ${item.name}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isLoading && (
        <div className="px-4 h-32 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
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
  )
}

export default CataniaPreview
