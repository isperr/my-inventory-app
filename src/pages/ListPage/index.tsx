import {useCallback, useEffect, useRef} from 'react'
import {Link} from 'react-router'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'

import PageTemplate from '../../templates/Page'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {onLoadData} from './hooks/use-data'
import {
  load,
  loaded,
  selectData,
  selectIsLoading
} from '../../modules/catania/slice'

const ListPage = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData)
  const isLoading = useAppSelector(selectIsLoading)

  const effectRan = useRef<boolean>(false)

  const handleLoadData = useCallback(async () => {
    dispatch(load())
    const data = await onLoadData()
    dispatch(loaded(data))
  }, [])

  useEffect(() => {
    if (!effectRan.current) {
      console.log('effect applied - only on the FIRST mount')
      handleLoadData()
    }

    return () => {
      effectRan.current = true
    }
  }, [])

  return (
    <PageTemplate className={isLoading ? 'h-screen' : 'h-fit'}>
      LIST page
      <Link to="/">home</Link>
      <Link to="/catania/157">157 color test</Link>
      {isLoading && (
        <div className="w-full flex justify-center items-center flex-1">
          <CircularProgress />
        </div>
      )}
      {Boolean(data.length) && (
        <List>
          {data.map(item => (
            <ListItem className="px-0" key={`item-${item.color}`}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    {item.imgUrl ? (
                      <img
                        className="h-[inherit]"
                        alt={item.name}
                        src={item.imgUrl}
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.color} secondary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </PageTemplate>
  )
}

export default ListPage
