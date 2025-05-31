import React, {useCallback, useMemo, useRef, useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {NumberField} from '@base-ui-components/react/number-field'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {Box, IconButton} from '@mui/material'

import {ThemePaletteModeContext} from '../../context'
import {isNull} from 'lodash'

const CountField = ({
  defaultValue,
  extraText,
  isDisabled
}: {
  extraText?: string
  defaultValue: number | null
  isDisabled: boolean
}) => {
  const themePaletteModeContext = React.useContext(ThemePaletteModeContext)
  const countRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<number | null>(defaultValue)

  const text = useMemo(() => {
    const textArr = ['Anzahl']

    if (extraText) {
      textArr.push(extraText)
    }

    textArr.push('*')

    return textArr.join(' ')
  }, [extraText])

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])
  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const onValueChange = (newValue: number | null, event: Event | undefined) => {
    // do no set newValue on focusout or input event type
    // focusout: (Tab + Shift will result in a rounded result e.g. 13 === 10 or 16 === 20)
    // input: handled within onChange of input field
    if (event?.type === 'focusout' || event?.type === 'input') {
      return
    }
    setValue(newValue)
  }

  return (
    <NumberField.Root
      allowWheelScrub
      className="relative"
      disabled={isDisabled}
      id="count"
      min={0}
      name="count"
      required
      onBlur={onBlur}
      onFocus={onFocus}
      onValueChange={onValueChange}
      value={value}
    >
      <NumberField.ScrubArea>
        <Box
          className={twMerge(
            'absolute text-base px-1 py-0.5',
            'top-3 h-fit w-fit transition-all',
            (isFocused || !isNull(value)) && '-translate-y-6 scale-[0.75]',
            extraText && 'left-[66px]',
            (isFocused || !isNull(value)) && extraText && '-translate-x-5',
            !extraText && 'left-[70px]',
            (isFocused || !isNull(value)) && !extraText && '-translate-x-2.5',
            themePaletteModeContext.themePaletteMode === 'light' && 'bg-white',
            themePaletteModeContext.themePaletteMode === 'dark' &&
              'bg-[#303031]',
            themePaletteModeContext.themePaletteMode === 'dark' &&
              !isFocused &&
              'text-[#C8CBCB]'
          )}
          component="label"
          htmlFor="count"
          sx={{color: isFocused ? 'primary.main' : '#00000099'}}
        >
          {text}
        </Box>
        <NumberField.ScrubAreaCursor>
          <AddIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className="flex justify-center items-center">
        <NumberField.Decrement
          className={twMerge(
            'rounded-l-md border-solid',
            'flex justify-center items-center p-[8.5px_10px]',
            'bg-transparent'
          )}
          render={props => (
            <IconButton
              aria-label="Decrease"
              className={twMerge(
                'border-solid border-2 rounded-r-none rounded-l-md',
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
            'border-solid border-[1px] border-[#C8CBCB]',
            'p-[16.5px_14px] outline-[1px] w-screen text-[16px] leading-[21px]',
            'font-[Roboto] bg-transparent',
            isFocused && 'border-[#8E75E0] outline-[#8E75E0]',
            themePaletteModeContext.themePaletteMode === 'dark' &&
              'text-text-dark-primary',
            !isFocused &&
              themePaletteModeContext.themePaletteMode === 'light' &&
              'hover:border-[#333]',
            !isFocused &&
              themePaletteModeContext.themePaletteMode === 'dark' &&
              'hover:border-[#fefefe]'
          )}
          ref={countRef}
          onChange={event => {
            setValue(event.target.value ? Number(event.target.value) : null)
          }}
        />
        <NumberField.Increment
          className={twMerge(
            'rounded-r-md border-solid',
            'flex justify-center items-center p-[11.25px_14px]',
            'bg-transparent'
          )}
          render={props => (
            <IconButton
              aria-label="Increase"
              className={twMerge(
                'border-solid border-2 rounded-l-none rounded-r-md',
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

export default CountField
