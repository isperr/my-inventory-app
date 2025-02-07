import {memo} from 'react'
import {useNavigate} from 'react-router'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import IconButton from '@mui/material/IconButton'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material'

import {CataniaDocumentData} from '../../../modules/catania/results/slice'
import PageText from '../../../atoms/PageText'

export type CataniaPreviewProps = {
  data: CataniaDocumentData[]
  hasError: boolean
  isLoading: boolean
  showHeader?: boolean
}

const CataniaPreview = ({
  data,
  hasError,
  isLoading,
  showHeader = true
}: CataniaPreviewProps) => {
  const navigate = useNavigate()

  return (
    <>
      {showHeader && (
        <List
          dense
          subheader={
            hasError ? null : (
              <ListSubheader className="leading-snug font-normal">
                Schachermayr Catania Sammlung
              </ListSubheader>
            )
          }
        >
          {data.map(item => (
            <ListItem
              key={`preview-item-${item.color}`}
              className="px-0"
              secondaryAction={
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="more"
                  onClick={() => {
                    navigate(`/catania/${item.color}`)
                  }}
                >
                  <ArrowCircleRightIcon fontSize="medium" />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  navigate(`/catania/${item.color}`)
                }}
              >
                <ListItemText
                  className="text-[#6d5b54]"
                  primary={`${item.color}, ${item.name}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {isLoading && (
        <div className="px-4 h-32 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      {hasError && (
        <PageText className="mx-4 pb-4">
          Bitte versuche die Seite neu zu Laden.
        </PageText>
      )}
    </>
  )
}

export default memo(CataniaPreview)
