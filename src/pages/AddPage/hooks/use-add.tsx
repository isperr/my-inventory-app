import {CollectionType} from '../../HomePage/types'

import {useAddAyos} from './use-add-ayos'
import {useAddGruendl} from './use-add-gruendl'
import {useAddMyboshi} from './use-add-myboshi'
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
  const {handleAdd: handleAddAyos, ...ayosState} = useAddAyos()
  const {handleAdd: handleAddMyboshi, ...myboshiState} = useAddMyboshi()

  if (collection === 'catania' || collection === 'catania-color') {
    return {handleAdd: handleAddCatania, ...cataniaState}
  }

  if (
    collection === 'cotton-quick' ||
    collection === 'cotton-quick-print' ||
    collection === 'funny-uni'
  ) {
    return {handleAdd: handleAddGruendl, ...gruendlState}
  }

  if (collection === 'samt') {
    return {handleAdd: handleAddMyboshi, ...myboshiState}
  }

  if (collection === 'samt-baby') {
    return {handleAdd: handleAddAyos, ...ayosState}
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
