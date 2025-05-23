import {Card, CardActionArea, CardContent, Typography} from '@mui/material'
import {memo} from 'react'
import CardImage from './CardImage'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'

type CardItemProps = {
  hasItems: boolean
  id: string
  imgUrl?: string
  name: string
}

const CardItem = ({hasItems, id, imgUrl, name}: CardItemProps) => {
  const navigate = useNavigate()
  const navigateToDetailPage = () => {
    navigate(`/finished-items/${id}`)
  }

  return (
    <Card
      className={twMerge(!hasItems && 'bg-[#f59a23] text-white')}
      key={name + '-item'}
    >
      <CardActionArea onClick={navigateToDetailPage}>
        <CardImage src={imgUrl} name={name} />
        <CardContent className="py-2">
          <Typography className="text-left truncate" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default memo(CardItem)
