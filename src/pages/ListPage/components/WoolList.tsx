import List from '@mui/material/List'
import CircularProgress from '@mui/material/CircularProgress'

import PageText from '../../../atoms/PageText'
import {
  selectData,
  selectError,
  selectIsLoading
} from '../../../modules/catania/slice'
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
      <PageText>
        Beim Laden der Daten ist leider ein Fehler aufgetreten.
      </PageText>
    )
  }

  if (!data.length) {
    return <PageText>Es befinden sich keine Wollknäuel in der Liste.</PageText>
  }

  return null
}

export default WoolList
