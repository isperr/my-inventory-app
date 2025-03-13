import React, {memo} from 'react'
import Chip from '@mui/material/Chip'

export type ActivatedChipProps = {
  activeText?: string
  ariaLabel?: string
  className?: string
  clickable: boolean
  inactiveText?: string
  isActivated: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  size?: 'small' | 'medium'
}

const ActivatedChip = ({
  activeText = 'Aktiv',
  ariaLabel,
  className,
  clickable,
  inactiveText = 'Inaktiv',
  isActivated,
  onClick,
  size
}: ActivatedChipProps) => (
  <Chip
    aria-label={ariaLabel}
    className={className}
    clickable={clickable}
    color={isActivated ? 'success' : 'error'}
    label={isActivated ? activeText : inactiveText}
    onClick={onClick}
    size={size}
  />
)

export default memo(ActivatedChip)
