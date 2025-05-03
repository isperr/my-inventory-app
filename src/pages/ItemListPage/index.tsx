import {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Link,
  Typography
} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import PageText from '../../atoms/PageText'
import {useScrollToTop} from '../../hooks/use-scroll-to-top'
import {selectCatgegoryFilter} from '../../modules/finished-items/results/selectors'
import PageTemplate from '../../templates/Page'
import {useAppSelector} from '../../utils/store-hooks'

import CardImage from './components/CardImage'
import CardItem from './components/CardItem'
import FilterDialog from './components/FilterDialog'
import {useLoadData} from './hooks/use-load-data'

const ItemListPage = () => {
  useScrollToTop()
  const effectRan = useRef<boolean>(false)
  const navigate = useNavigate()

  const categoryFilter = useAppSelector(selectCatgegoryFilter)

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
    <PageTemplate className="h-fit grid grid-cols-3 gap-4 w-full px-4 pb-4">
      <Typography className="col-span-3 text-center" variant="h4">
        Fertige Werke
      </Typography>
      <FilterDialog />
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

          {data
            .filter(it => categoryFilter.includes(it.category))
            .map(it => (
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
