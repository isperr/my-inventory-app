import {twMerge} from 'tailwind-merge'
import {IconButton, ListItem, ListItemButton, ListItemText} from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

import {WoolListItemType} from '../../molecules/WoolList/components/WoolListItem'
import ActivatedChip from '../ActivatedChip'

export type ListPreviewItemProps = Pick<
  WoolListItemType,
  'color' | 'isActivated' | 'name'
> & {
  className: string
  onNavigate: (color: number) => void
  showIsActivatedChip: boolean
}

const Item = ({
  className,
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
      className={twMerge('pl-0', className)}
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
      <ListItemButton
        className={twMerge('px-3', showIsActivatedChip && 'pr-0')}
        onClick={handleNavigation}
      >
        <ListItemText
          primary={
            <div className="flex items-center justify-between">
              <span>
                {color} ({name})
              </span>
              {showIsActivatedChip && (
                <ActivatedChip
                  className="leading-[1]"
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
