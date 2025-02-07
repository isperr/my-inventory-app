import {ReactNode} from 'react'
import Typography from '@mui/material/Typography'
import {Paper} from '@mui/material'
import {twMerge} from 'tailwind-merge'

export type PageTextProps = {
  children: ReactNode
  className?: string
}

const PageText = ({children, className}: PageTextProps) => (
  <Paper className={twMerge('mx-6', className)} elevation={0}>
    <Typography color="primary" variant="h6">
      {children}
    </Typography>
  </Paper>
)

export default PageText
