import {CollectionType} from '../../../molecules/WoolListPreview'
import {useAddCatania} from './use-add-catania'

export const useAdd = (collection?: CollectionType) => {
  const {handleAdd: handleAddCatania, ...cataniaState} = useAddCatania()

  if (collection === 'catania') {
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
