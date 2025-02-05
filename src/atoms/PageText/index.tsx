import {ReactNode} from 'react'
import Typography from '@mui/material/Typography'
import {Paper} from '@mui/material'

export type PageTextProps = {
  children: ReactNode
}

const PageText = ({children}: PageTextProps) => (
  <Paper className="mx-6" elevation={0}>
    <Typography color="primary" variant="h6">
      {children}
    </Typography>
  </Paper>
)

export default PageText
