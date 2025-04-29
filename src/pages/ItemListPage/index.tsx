import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Link,
  Typography
} from '@mui/material'

import PageTemplate from '../../templates/Page'
import FloatingButton from '../../atoms/FloatingButton'
import {useLoadData} from './hooks/use-load-data'
import {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router'
import CardImage from './components/CardImage'
import CardItem from './components/CardItem'
import PageText from '../../atoms/PageText'

const ItemListPage = () => {
  const effectRan = useRef<boolean>(false)
  const navigate = useNavigate()

  const navigateToAddPage = () => {
    navigate('/finished-items/add')
  }

  const {data, handleLoadData, hasError, isLoaded, isLoading} = useLoadData()

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  return (
    <PageTemplate className="h-fit grid grid-cols-3 gap-4 w-full px-4">
      <Typography className="col-span-3 text-center" variant="h4">
        Fertige Werke
      </Typography>
      {hasError && (
        <PageText className="col-span-3 mx-0">
          Versuche die Seite neu zu Laden oder navigiere{' '}
          <Link color="secondary" href="/">
            zurück
          </Link>{' '}
          zur Homepage.
        </PageText>
      )}
      {isLoading && (
        <Box className="absolute h-3/4 left-0 right-0 flex justify-center items-center">
          <CircularProgress />
        </Box>
      )}
      {isLoaded && (
        <>
          <Card
            key="add-item"
            className="flex flex-col justify-end items-center"
          >
            <CardActionArea onClick={navigateToAddPage}>
              <CardImage type="add" />

              <CardContent className="py-2">
                <Typography className="text-left truncate" component="div">
                  Hinzufügen
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {data.map(it => (
            <CardItem
              key={it.name + '-item'}
              id={it.id}
              imgUrl={it.imgUrl}
              name={it.name}
            />
          ))}
        </>
      )}
      <FloatingButton />
    </PageTemplate>
  )
}

export default ItemListPage
