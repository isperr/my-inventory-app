import {memo} from 'react'
import {useNavigate} from 'react-router'
import {List, ListSubheader, Typography} from '@mui/material'

import {WoolListItemType} from '../WoolList/components/WoolListItem'
import Loading from '../../atoms/ListPreview/Loading'
import ErrorComponent from '../../atoms/ListPreview/Error'
import Item from '../../atoms/ListPreview/Item'

export type CollectionType = 'catania'
export type WoolListPreviewProps = {
  collection: CollectionType
  data: WoolListItemType[]
  hasError: boolean
  headerText: string
  isLoading: boolean
  listClassName?: string
}

const WoolListPreview = ({
  collection,
  data,
  hasError,
  headerText,
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
              {headerText}
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
