import React, {memo, ReactNode} from 'react'
import {useNavigate} from 'react-router'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Typography
} from '@mui/material'

import {ThemePaletteModeContext} from '../../context'
import Loading from '../../atoms/ListPreview/Loading'
import ErrorComponent from '../../atoms/ListPreview/Error'
import Item from '../../atoms/ListPreview/Item'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'

import {WoolListItemType} from '../WoolList/components/WoolListItem'

export type WoolListPreviewProps = {
  button?: ReactNode
  collection: CollectionType
  data: WoolListItemType[]
  hasError: boolean
  isLoaded: boolean
  isLoading: boolean
  listClassName?: string
  showIsActivatedChip?: boolean
}

const WoolListPreview = ({
  button,
  collection,
  data,
  hasError,
  isLoaded,
  isLoading,
  listClassName,
  showIsActivatedChip = false
}: WoolListPreviewProps) => {
  const navigate = useNavigate()
  const themePaletteModeContext = React.useContext(ThemePaletteModeContext)

  const onNavigate = (color: number) => {
    navigate(`/${collection}/${color}`)
  }

  return (
    <Paper className="mx-4" elevation={2}>
      <List
        className={listClassName}
        dense
        subheader={
          button ? (
            button
          ) : (
            <ListSubheader className="leading-snug mt-1 px-2.5 bg-transparent">
              <Typography
                className="font-bold"
                variant="subtitle1"
                sx={{
                  color:
                    themePaletteModeContext.themePaletteMode === 'light'
                      ? 'primary.dark'
                      : 'primary.light'
                }}
              >
                {collectionNames[collection]}
              </Typography>
            </ListSubheader>
          )
        }
      >
        {data.map(item => (
          <Item
            key={`${collection}-preview-item-${item.color}`}
            className={button ? 'py-0.5' : 'py-0'}
            color={item.color}
            isActivated={item.isActivated}
            name={item.name}
            onNavigate={onNavigate}
            showIsActivatedChip={showIsActivatedChip}
          />
        ))}
        {isLoaded && !data.length && (
          <ListItem className="px-2">
            <ListItemText
              className="italic"
              primary="Es befinden sich keine Wollknäuel in der Sammlung."
            />
          </ListItem>
        )}
      </List>
      {isLoading && <Loading />}
      {hasError && (
        <ErrorComponent
          collection={collection}
          showCollectionName={showIsActivatedChip}
        />
      )}
    </Paper>
  )
}

export default memo(WoolListPreview)
