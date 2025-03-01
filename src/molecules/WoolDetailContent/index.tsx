import {memo, ReactNode} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'

import Logo from '../../atoms/Logo'
import PageText from '../../atoms/PageText'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'

export type WoolDetailContentProps = {
  children?: ReactNode
  collection: CollectionType
  hasResolveError: boolean
  id?: string
  isResolved: boolean
  isResolving: boolean
}

const WoolDetailContent = ({
  children,
  collection,
  hasResolveError,
  id,
  isResolved,
  isResolving
}: WoolDetailContentProps) => {
  if (isResolving) {
    return (
      <div className="w-full flex justify-center items-center flex-1">
        <CircularProgress />
      </div>
    )
  }

  if (hasResolveError) {
    return (
      <>
        <Logo />
        <PageText>
          Versuche die Seite neu zu Laden oder navigiere{' '}
          <Link color="secondary" href={`/${collection}`}>
            zurück
          </Link>{' '}
          zur Liste.
        </PageText>
      </>
    )
  }

  if (isResolved && !children) {
    return (
      <PageText>
        Ein Wollknäuel mit der Farbe "{id}" existiert leider nicht in der
        {collectionNames[collection]} Sammlung.
      </PageText>
    )
  }

  if (children) {
    return children
  }

  return null
}

export default memo(WoolDetailContent)
