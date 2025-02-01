import {useCallback, useMemo} from 'react'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import {Fab} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CropFreeIcon from '@mui/icons-material/CropFree'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export type FloatingButtonProps = {
  ariaLabel?: string
  icon?: 'back' | 'home' | 'scan'
  path?: string
  position?: 'primary' | 'secondary'
}

const FloatingButton = ({
  ariaLabel,
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
    }

    return HomeIcon
  }, [icon])

  return (
    <Fab
      className={twMerge(
        'fixed bottom-4',
        position === 'primary' && 'right-4',
        position === 'secondary' && 'right-20 mr-1'
      )}
      color="secondary"
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <Icon fontSize="large" />
    </Fab>
  )
}

export default FloatingButton
