import {ReactNode, useCallback, useMemo} from 'react'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import {Fab} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CropFreeIcon from '@mui/icons-material/CropFree'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PetsIcon from '@mui/icons-material/Pets'

export type FloatingButtonProps = {
  ariaLabel?: string
  children?: ReactNode
  icon?: 'back' | 'home' | 'scan' | 'items'
  path?: string
  position?: 'primary' | 'secondary'
}

const FloatingButton = ({
  ariaLabel,
  children,
  icon = 'home',
  path = '/',
  position = 'primary'
}: FloatingButtonProps) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(path)
  }, [path])

  const Icon = useMemo(() => {
    if (icon === 'back') {
      return ArrowBackIcon
    } else if (icon === 'scan') {
      return CropFreeIcon
    } else if (icon === 'items') {
      return PetsIcon
    }

    return HomeIcon
  }, [icon])

  return (
    <Fab
      className={twMerge(
        'fixed bottom-4 gap-1',
        position === 'primary' && 'right-4',
        position === 'secondary' && 'right-20 mr-1',
        children && 'bottom-5'
      )}
      color="secondary"
      aria-label={ariaLabel}
      onClick={handleClick}
      variant={children ? 'extended' : undefined}
    >
      <Icon fontSize="large" />
      {children}
    </Fab>
  )
}

export default FloatingButton
