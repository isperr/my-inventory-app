import {memo} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'

import Logo from '../../../atoms/Logo'
import PageText from '../../../atoms/PageText'
import {
  selectIsIdResolved,
  selectIsIdResolving,
  selectHasResolveError,
  selectResolveData
} from '../../../modules/catania/selectors'
import {CataniaDocumentData} from '../../../modules/catania/slice'
import {useAppSelector} from '../../../utils/store-hooks'

import Color from './Color'

export type ColorPageContentProps = {
  item: null | CataniaDocumentData
}

const Content = ({id}: {id?: string}) => {
  const item = useAppSelector(selectResolveData(id))
  const isResolved = useAppSelector(selectIsIdResolved(id))
  const isResolving = useAppSelector(selectIsIdResolving(id))
  const hasResolveError = useAppSelector(selectHasResolveError(id))

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
          <Link color="secondary" href="/catania">
            zurück
          </Link>{' '}
          zur Liste.
        </PageText>
      </>
    )
  }

  if (isResolved && !item) {
    return (
      <PageText>
        Ein Wollknäuel mit der Farbe "{id}" existiert leider nicht in der
        Sammlung.
      </PageText>
    )
  }

  if (item) {
    return (
      <Color
        color={item.color}
        count={item.count}
        imgUrl={item.imgUrl}
        isbn={item.ISBN}
        name={item.name}
      />
    )
  }

  return null
}

export default memo(Content)
