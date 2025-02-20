import Link from '@mui/material/Link'
import List from '@mui/material/List'
import CircularProgress from '@mui/material/CircularProgress'

import Logo from '../../../atoms/Logo'
import PageText from '../../../atoms/PageText'
import {
  selectData,
  selectError,
  selectIsLoading
} from '../../../modules/catania/results/selectors'
import {useAppSelector} from '../../../utils/store-hooks'

import WoolListItem from './WoolListItem'

const WoolList = () => {
  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoading = useAppSelector(selectIsLoading)

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center flex-1">
        <CircularProgress />
      </div>
    )
  }

  if (data.length) {
    return (
      <List className="pt-0">
        {data.map(item => (
          <WoolListItem
            key={`item-${item.color}`}
            color={item.color}
            count={item.count}
            imgUrl={item.imgUrl}
            name={item.name}
          />
        ))}
      </List>
    )
  }

  if (error) {
    return (
      <>
        <Logo />
        <PageText>
          Versuche die Seite neu zu Laden oder navigiere{' '}
          <Link color="secondary" href="/catania">
            zurück
          </Link>{' '}
          zur Homepage.
        </PageText>
      </>
    )
  }

  if (!data.length) {
    return <PageText>Es befinden sich keine Wollknäuel in der Liste.</PageText>
  }

  return null
}

export default WoolList
