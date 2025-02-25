import {Typography} from '@mui/material'

export type ColorTextProps = {
  heading?: string
  text?: string
}

const ColorText = ({heading, text}: ColorTextProps) => {
  if (!text) {
    return (
      <Typography color="primary" variant="h6">
        {heading}
      </Typography>
    )
  }
  if (!heading) {
    return (
      <Typography color="primary" variant="subtitle1">
        {text}
      </Typography>
    )
  }

  return (
    <>
      <Typography
        className="col-span-1"
        color="primary"
        fontWeight="bold"
        variant="subtitle1"
      >
        {heading}
      </Typography>
      <Typography className="col-span-3" variant="subtitle1">
        {text}
      </Typography>
    </>
  )
}

export default ColorText
