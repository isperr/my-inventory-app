import {memo} from 'react'
import {useNavigate} from 'react-router'
import {List, ListSubheader, Typography} from '@mui/material'

import Loading from '../../atoms/ListPreview/Loading'
import ErrorComponent from '../../atoms/ListPreview/Error'
import Item from '../../atoms/ListPreview/Item'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'

import {WoolListItemType} from '../WoolList/components/WoolListItem'

export type WoolListPreviewProps = {
  collection: CollectionType
  data: WoolListItemType[]
  hasError: boolean
  isLoading: boolean
  listClassName?: string
}

const WoolListPreview = ({
  collection,
  data,
  hasError,
  isLoading,
  listClassName
}: WoolListPreviewProps) => {
  const navigate = useNavigate()

  const onNavigate = (color: number) => {
    navigate(`/${collection}/${color}`)
  }

  return (
    <>
      <List
        className={listClassName}
        dense
        subheader={
          <ListSubheader className="leading-snug">
            <Typography
              className="font-bold"
              variant="subtitle1"
              sx={{color: 'primary.dark'}}
            >
              {collectionNames[collection]}
            </Typography>
          </ListSubheader>
        }
      >
        {data.map(item => (
          <Item
            key={`${collection}-preview-item-${item.color}`}
            color={item.color}
            name={item.name}
            onNavigate={onNavigate}
          />
        ))}
      </List>
      {isLoading && <Loading />}
      {hasError && <ErrorComponent />}
    </>
  )
}

export default memo(WoolListPreview)
