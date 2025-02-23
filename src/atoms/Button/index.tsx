import React, {ReactNode} from 'react'
import MuiButton from '@mui/material/Button'

export type ButtonProps = {
  ariaLabel?: string
  autoFocus?: boolean
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  isLoading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  type?: 'submit' | 'button' | 'reset'
}

const Button = ({
  ariaLabel,
  autoFocus,
  children,
  className,
  fullWidth,
  isLoading,
  onClick,
  size,
  type
}: ButtonProps) => (
  <MuiButton
    aria-label={ariaLabel}
    autoFocus={autoFocus}
    className={className}
    fullWidth={fullWidth}
    loading={isLoading}
    loadingPosition="end"
    onClick={onClick}
    size={size}
    type={type}
    variant="contained"
  >
    {children}
  </MuiButton>
)

export default Button
