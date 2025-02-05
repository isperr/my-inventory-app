import {ReactNode} from 'react'
import Typography from '@mui/material/Typography'
import woolInventory from '../../assets/wool_inventory.png'

export type LogoProps = {
  children?: ReactNode
}

const Logo = ({children}: LogoProps) => (
  <div className="flex flex-col items-center gap-4">
    <img className="size-[193px]" alt="wool-inventory" src={woolInventory} />
    {children && <Typography variant="h5">{children}</Typography>}
  </div>
)

export default Logo
