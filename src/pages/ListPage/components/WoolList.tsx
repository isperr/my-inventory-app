import List from '@mui/material/List'
import CircularProgress from '@mui/material/CircularProgress'
import {Typography} from '@mui/material'

import {useAppSelector} from '../../../utils/store-hooks'
import {selectData, selectIsLoading} from '../../../modules/catania/slice'
import WoolListItem from './WoolListItem'

const WoolList = () => {
  const data = useAppSelector(selectData)
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

  if (!data.length) {
    return <Typography>Es befinden sich keine Items in der Liste.</Typography>
  }

  return null
}

export default WoolList
