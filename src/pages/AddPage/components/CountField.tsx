import {memo, useCallback, useRef, useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {NumberField} from '@base-ui-components/react/number-field'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {IconButton, Paper} from '@mui/material'

const CountField = ({isDisabled}: {isDisabled: boolean}) => {
  const countRef = useRef<HTMLInputElement | null>(null)

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])
  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return (
    <NumberField.Root
      className="relative"
      disabled={isDisabled}
      id="count"
      min={0}
      name="count"
      required
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <NumberField.ScrubArea>
        <Paper
          className={twMerge(
            'absolute bg-white text-base px-1 py-0.5',
            'left-[66px] top-3 h-fit w-fit transition-all',
            (isFocused || countRef.current?.value) &&
              '-translate-x-5 -translate-y-6 scale-[0.75]'
          )}
          component="label"
          elevation={0}
          htmlFor="count"
          sx={{color: isFocused ? 'primary.main' : '#00000099'}}
        >
          Anzahl der Wollknäuel *
        </Paper>
        <NumberField.ScrubAreaCursor>
          <AddIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className="flex justify-center items-center">
        <NumberField.Decrement
          className={twMerge(
            'rounded-l-md border-[#c16f50] border-solid',
            'flex justify-center items-center p-[8.5px_10px]',
            'bg-transparent text-[#c16f50]'
          )}
          render={props => (
            <IconButton
              aria-label="Decrease"
              className={twMerge(
                'border-solid border-2 rounded-r-none rounded-l-md',
                !isDisabled && 'border-[#c16f50]',
                isDisabled && 'border-[#00000042]'
              )}
              color="secondary"
              size="large"
              onClick={props.onClick}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onMouseUp={props.onMouseUp}
              onPointerDown={props.onPointerDown}
              onPointerMove={props.onPointerMove}
              onTouchEnd={props.onTouchEnd}
              onTouchStart={props.onTouchStart}
              style={props.style}
              tabIndex={props.tabIndex}
            >
              <RemoveIcon
                color={isDisabled ? 'disabled' : 'secondary'}
                fontSize="inherit"
              />
            </IconButton>
          )}
        />
        <NumberField.Input
          className={twMerge(
            'border-solid border-[1px] border-[#c4c4c4] outline-[#86694c]',
            'p-[16.5px_14px] outline-[1px] w-screen text-[16px] leading-[21px]',
            'font-[Roboto]'
          )}
          ref={countRef}
        />
        <NumberField.Increment
          className={twMerge(
            'rounded-r-md border-[#c16f50] border-solid',
            'flex justify-center items-center p-[11.25px_14px]',
            'bg-transparent text-[#c16f50]'
          )}
          render={props => (
            <IconButton
              aria-label="Increase"
              className={twMerge(
                'border-solid border-2 rounded-l-none rounded-r-md',
                !isDisabled && 'border-[#c16f50]',
                isDisabled && 'border-[#00000042]'
              )}
              color="secondary"
              size="large"
              onClick={props.onClick}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              onMouseUp={props.onMouseUp}
              onPointerDown={props.onPointerDown}
              onPointerMove={props.onPointerMove}
              onTouchEnd={props.onTouchEnd}
              onTouchStart={props.onTouchStart}
              style={props.style}
              tabIndex={props.tabIndex}
            >
              <AddIcon
                color={isDisabled ? 'disabled' : 'secondary'}
                fontSize="inherit"
              />
            </IconButton>
          )}
        />
      </NumberField.Group>
    </NumberField.Root>
  )
}

export default memo(CountField)
