import {Card, CardActionArea, CardContent, Typography} from '@mui/material'
import {memo} from 'react'
import CardImage from './CardImage'
import {useNavigate} from 'react-router'

type CardItemProps = {
  id: string
  imgUrl?: string
  name: string
}

const CardItem = ({id, imgUrl, name}: CardItemProps) => {
  const navigate = useNavigate()
  const navigateToDetailPage = () => {
    navigate(`/finished-items/${id}`)
  }

  return (
    <Card key={name + '-item'}>
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
