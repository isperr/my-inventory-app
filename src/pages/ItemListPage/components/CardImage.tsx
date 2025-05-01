import {memo, useMemo} from 'react'
import {Avatar, CardMedia} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import {twMerge} from 'tailwind-merge'

type CardImageProps = {
  name?: string
  src?: string
  type?: 'add' | 'image'
}

const CardImage = ({name, src, type = 'image'}: CardImageProps) => {
  const Icon = useMemo(() => (type === 'add' ? AddIcon : ImageIcon), [type])

  if (src && name) {
    return (
      <CardMedia
        className="object-contain"
        component="img"
        height="80"
        image={src}
        alt={name}
      />
    )
  }

  return (
    <Avatar
      className={twMerge(
        'text-white',
        type === 'add' && 'size-[64px] rounded-full mx-auto mb-1.5 mt-2.5',
        type === 'image' && 'h-[80px] w-full rounded-none'
      )}
    >
      <Icon color="inherit" fontSize="large" />
    </Avatar>
  )
}

export default memo(CardImage)
