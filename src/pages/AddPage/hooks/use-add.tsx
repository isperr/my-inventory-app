import {CollectionType} from '../../HomePage/types'
import {useAddGruendl} from './use-add-gruendl'

import {useAddSchachenmayr} from './use-add-schachenmayr'

export type CreateItemDataType = {
  color: number
  count: number
  ISBN: number
  isActivated: boolean
  name: string
}

export const useAdd = (collection?: CollectionType) => {
  const {handleAdd: handleAddCatania, ...cataniaState} = useAddSchachenmayr()
  const {handleAdd: handleAddGruendl, ...gruendlState} = useAddGruendl()

  if (collection === 'catania' || collection === 'catania-color') {
    return {handleAdd: handleAddCatania, ...cataniaState}
  }

  if (
    collection === 'cotton-quick' ||
    collection === 'cotton-quick-print' ||
    collection === 'funny'
  ) {
    return {handleAdd: handleAddGruendl, ...gruendlState}
  }

  return {
    color: undefined,
    isbn: undefined,
    isAdded: false,
    isAdding: false,
    isDisabled: false,
    handleAdd: () => {}
  }
}
