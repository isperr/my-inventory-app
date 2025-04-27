import {Typography} from '@mui/material'
import {memo} from 'react'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'
import {twMerge} from 'tailwind-merge'

const ErrorComponent = ({
  collection,
  showCollectionName
}: {
  collection: CollectionType
  showCollectionName: boolean
}) => (
  <>
    {showCollectionName && (
      <Typography className="px-2 py-0.5" color="primary" variant="h6">
        {collectionNames[collection]}
      </Typography>
    )}
    <Typography
      className={twMerge('px-2 py-0.5 italic', !showCollectionName && 'my-1')}
    >
      Bitte versuche die Seite neu zu Laden.
    </Typography>
  </>
)

export default memo(ErrorComponent)
