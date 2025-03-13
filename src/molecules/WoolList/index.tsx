import {memo} from 'react'
import List from '@mui/material/List'

import Empty from '../../atoms/WoolList/Empty'
import ErrorComponent from '../../atoms/WoolList/Error'
import Loading from '../../atoms/WoolList/Loading'

import WoolListItem, {WoolListItemType} from './components/WoolListItem'

export type WoolListProps = {
  data: Array<WoolListItemType>
  error: Error | null
  isLoading: boolean
  link: string
}

const WoolList = ({data, error, isLoading, link}: WoolListProps) => {
  if (isLoading) {
    return <Loading className="min-h-[65vh]" />
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
            isActivated={item.isActivated}
            name={item.name}
            parentLink={link}
          />
        ))}
      </List>
    )
  }

  if (error) {
    return <ErrorComponent link={link} />
  }

  if (!data.length) {
    return <Empty />
  }

  return null
}

export default memo(WoolList)
