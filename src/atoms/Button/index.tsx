import React, {ReactNode} from 'react'
import MuiButton from '@mui/material/Button'

export type ButtonProps = {
  ariaLabel?: string
  autoFocus?: boolean
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  startIcon?: ReactNode
  type?: 'submit' | 'button' | 'reset'
}

const Button = ({
  ariaLabel,
  autoFocus,
  children,
  className,
  fullWidth,
  isDisabled,
  isLoading,
  onClick,
  size,
  startIcon,
  type
}: ButtonProps) => (
  <MuiButton
    aria-label={ariaLabel}
    autoFocus={autoFocus}
    className={className}
    disabled={isDisabled}
    fullWidth={fullWidth}
    loading={isLoading}
    loadingPosition="end"
    onClick={onClick}
    size={size}
    type={type}
    variant="contained"
    startIcon={startIcon}
  >
    {children}
  </MuiButton>
)

export default Button
