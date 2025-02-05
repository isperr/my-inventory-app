import {ReactNode} from 'react'
import MuiButton from '@mui/material/Button'

export type ButtonProps = {
  ariaLabel?: string
  children?: ReactNode
  isLoading?: boolean
  type?: 'submit' | 'button' | 'reset'
}

const Button = ({ariaLabel, children, isLoading, type}: ButtonProps) => (
  <MuiButton
    aria-label={ariaLabel}
    loading={isLoading}
    loadingPosition="end"
    type={type}
    variant="contained"
  >
    {children}
  </MuiButton>
)

export default Button
