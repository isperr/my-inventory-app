import {memo, useCallback, useMemo} from 'react'
import {twMerge} from 'tailwind-merge'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'

import ColorText from './ColorText'
import {CircularProgress} from '@mui/material'

export type CountButtonProps = {
  ariaLabel: string
  count: number
  isDisabled: boolean
  isLoading: boolean
  onClick: (updatedCount: number, type: 'add' | 'remove') => void
  type: 'add' | 'remove'
}

const CountButton = ({
  ariaLabel,
  count,
  isDisabled,
  isLoading,
  onClick,
  type
}: CountButtonProps) => {
  const handleClick = useCallback(() => {
    onClick(type === 'add' ? count + 1 : count - 1, type)
  }, [count, onClick, type])

  const text = useMemo(() => {
    if (type === 'add') {
      return 'Knäul hinzufügen:'
    }
    if (type === 'remove') {
      return 'Knäul entfernen:'
    }
    return null
  }, [type])

  return (
    <div className="flex flex-col items-center gap-4">
      {text && <ColorText text={text} />}
      <div className="relative">
        <IconButton
          aria-label={ariaLabel}
          className={twMerge('border-solid border-2')}
          color="secondary"
          disabled={isDisabled}
          onClick={handleClick}
          size="large"
        >
          {type === 'add' ? (
            <AddIcon fontSize="inherit" />
          ) : (
            <RemoveIcon fontSize="inherit" />
          )}
        </IconButton>
        {isLoading && (
          <CircularProgress
            size={68}
            sx={{
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1
            }}
          />
        )}
      </div>
    </div>
  )
}

export default memo(CountButton)
