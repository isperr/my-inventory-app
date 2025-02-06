import React, {ReactNode} from 'react'
import MuiButton from '@mui/material/Button'

export type ButtonProps = {
  ariaLabel?: string
  children?: ReactNode
  className?: string
  isLoading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  type?: 'submit' | 'button' | 'reset'
}

const Button = ({
  ariaLabel,
  children,
  className,
  isLoading,
  onClick,
  size,
  type
}: ButtonProps) => (
  <MuiButton
    aria-label={ariaLabel}
    className={className}
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
