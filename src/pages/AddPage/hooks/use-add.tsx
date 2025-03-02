import {CollectionType} from '../../HomePage/types'

import {useAddCatania} from './use-add-catania'

export type CreateItemDataType = {
  color: number
  count: number
  ISBN: number
  isActivated: boolean
  name: string
}

export const useAdd = (collection?: CollectionType) => {
  const {handleAdd: handleAddCatania, ...cataniaState} = useAddCatania()

  if (collection === 'catania' || collection === 'catania-color') {
    return {handleAdd: handleAddCatania, ...cataniaState}
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
