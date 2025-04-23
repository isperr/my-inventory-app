import {Typography} from '@mui/material'
import {memo} from 'react'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'

const ErrorComponent = ({collection}: {collection: CollectionType}) => (
  <>
    <Typography className="px-2 py-0.5" color="primary" variant="h6">
      {collectionNames[collection]}
    </Typography>
    <Typography className="px-2 py-0.5 italic">
      Bitte versuche die Seite neu zu Laden.
    </Typography>
  </>
)

export default memo(ErrorComponent)
