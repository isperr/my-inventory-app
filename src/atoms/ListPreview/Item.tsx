import {IconButton, ListItem, ListItemButton, ListItemText} from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

import {WoolListItemType} from '../../molecules/WoolList/components/WoolListItem'
import ActivatedChip from '../ActivatedChip'

export type ListPreviewItemProps = Pick<
  WoolListItemType,
  'color' | 'isActivated' | 'name'
> & {
  onNavigate: (color: number) => void
  showIsActivatedChip: boolean
}

const Item = ({
  color,
  isActivated,
  name,
  onNavigate,
  showIsActivatedChip
}: ListPreviewItemProps) => {
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
          primary={
            <div className="flex items-center justify-between">
              <span>
                {color} ({name})
              </span>
              {showIsActivatedChip && (
                <ActivatedChip
                  clickable={false}
                  isActivated={isActivated}
                  size="small"
                />
              )}
            </div>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}

export default Item
