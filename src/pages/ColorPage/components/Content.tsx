import {memo} from 'react'
import {CircularProgress} from '@mui/material'

import {
  selectIsIdResolved,
  selectIsIdResolving,
  selectHasResolveError
} from '../../../modules/catania/slice'
import {useAppSelector} from '../../../utils/store-hooks'

import Color from './Color'
import {
  CataniaDocumentData,
  selectResolveData
} from '../../../modules/catania/slice'
import PageText from '../../../atoms/PageText'

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
      <PageText>
        Beim Laden der Daten ist leider ein Fehler aufgetreten.
      </PageText>
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
