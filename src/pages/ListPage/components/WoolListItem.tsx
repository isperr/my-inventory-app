import {memo} from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import ListItemButton from '@mui/material/ListItemButton'
import {IconButton} from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import {useNavigate} from 'react-router'

export type WoolListItemProps = {
  color: number
  count: number
  imgUrl?: string
  name: string
}

const WoolListItem = ({color, count, imgUrl, name}: WoolListItemProps) => {
  const navigate = useNavigate()

  const navigateToWool = () => {
    navigate(`/catania/${color}`)
  }

  return (
    <ListItem
      className="px-0"
      secondaryAction={
        <IconButton
          color="primary"
          edge="end"
          aria-label="more"
          onClick={navigateToWool}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </IconButton>
      }
    >
      <ListItemButton onClick={navigateToWool}>
        <ListItemAvatar>
          <Avatar className="min-w-[70px] rounded-3xl mr-4">
            {imgUrl ? (
              <img className="h-[inherit]" alt={name} src={imgUrl} />
            ) : (
              <ImageIcon />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${color} - ${name}`}
          secondary={`Anzahl: ${count}`}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default memo(WoolListItem)
