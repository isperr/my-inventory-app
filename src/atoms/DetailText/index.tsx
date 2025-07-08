import {memo} from 'react'
import {Typography} from '@mui/material'
import {twMerge} from 'tailwind-merge'

export type DetailTextProps = {
  heading?: string
  text?: string
  type: 'wool' | 'item'
}

const DetailText = ({heading, type, text}: DetailTextProps) => {
  if (!text) {
    return (
      <Typography color="primary" variant="h6">
        {heading}
      </Typography>
    )
  }
  if (!heading) {
    return (
      <Typography color="secondary" variant="subtitle1">
        {text}
      </Typography>
    )
  }

  return (
    <>
      <Typography
        className={twMerge(
          type === 'wool' && 'col-span-2',
          type === 'item' && 'col-span-3'
        )}
        color="primary"
        fontWeight="bold"
        variant="subtitle1"
      >
        {heading}
      </Typography>
      <Typography
        className={twMerge(
          type === 'wool' && 'col-span-7',
          type === 'item' && 'col-span-7',
          'whitespace-pre-wrap'
        )}
        variant="subtitle1"
      >
        {text}
      </Typography>
    </>
  )
}

export default memo(DetailText)
