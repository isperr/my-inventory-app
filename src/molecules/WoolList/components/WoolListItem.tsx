import {memo} from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ImageIcon from '@mui/icons-material/Image'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {useNavigate} from 'react-router'

export type WoolListItemType = {
  color: number
  count: number
  imgUrl?: string | null
  name: string
}

export type WoolListItemProps = WoolListItemType & {
  parentLink: string
}

const WoolListItem = ({
  color,
  count,
  imgUrl,
  name,
  parentLink
}: WoolListItemProps) => {
  const navigate = useNavigate()

  const navigateToWool = () => {
    navigate(`${parentLink}/${color}`)
  }

  return (
    <ListItem
      className="p-0"
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
