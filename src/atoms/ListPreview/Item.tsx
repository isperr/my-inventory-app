import {IconButton, ListItem, ListItemButton, ListItemText} from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

import {WoolListItemType} from '../../molecules/WoolList/components/WoolListItem'

export type ListPreviewItemProps = Pick<WoolListItemType, 'color' | 'name'> & {
  onNavigate: (color: number) => void
}

const Item = ({color, name, onNavigate}: ListPreviewItemProps) => {
  const handleNavigation = () => {
    onNavigate(color)
  }

  return (
    <ListItem
      key={`preview-item-${color}`}
      className="px-0"
      secondaryAction={
        <IconButton
          color="primary"
          edge="end"
          aria-label="more"
          onClick={handleNavigation}
        >
          <ArrowCircleRightIcon fontSize="medium" />
        </IconButton>
      }
    >
      <ListItemButton onClick={handleNavigation}>
        <ListItemText
          className="text-[#6d5b54]"
          primary={`${color}, ${name}`}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default Item
