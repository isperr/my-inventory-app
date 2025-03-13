import {memo} from 'react'
import {useNavigate} from 'react-router'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography
} from '@mui/material'

import Loading from '../../atoms/ListPreview/Loading'
import ErrorComponent from '../../atoms/ListPreview/Error'
import Item from '../../atoms/ListPreview/Item'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'

import {WoolListItemType} from '../WoolList/components/WoolListItem'

export type WoolListPreviewProps = {
  collection: CollectionType
  data: WoolListItemType[]
  hasError: boolean
  isLoaded: boolean
  isLoading: boolean
  listClassName?: string
  showIsActivatedChip?: boolean
}

const WoolListPreview = ({
  collection,
  data,
  hasError,
  isLoaded,
  isLoading,
  listClassName,
  showIsActivatedChip = false
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
            isActivated={item.isActivated}
            name={item.name}
            onNavigate={onNavigate}
            showIsActivatedChip={showIsActivatedChip}
          />
        ))}
        {isLoaded && !data.length && (
          <ListItem>
            <ListItemText
              className="text-[#6d5b54] italic"
              primary="Es befinden sich keine Wollknäuel in der Sammlung."
            />
          </ListItem>
        )}
      </List>
      {isLoading && <Loading />}
      {hasError && <ErrorComponent />}
    </>
  )
}

export default memo(WoolListPreview)
