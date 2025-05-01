import {getFirestore, addDoc, collection} from 'firebase/firestore'
import {useCallback, useEffect} from 'react'

import {onCreateImage} from '../../../hooks/finished-items/use-create-image'
import {onResolve} from '../../../hooks/finished-items/use-resolve'
import {
  add,
  added,
  addingError,
  reset,
  selectIsAdded,
  selectIsAdding
} from '../../../modules/finished-items/add/slice'
import {insert} from '../../../modules/finished-items/results/slice'
import {ItemCategory, ItemDocumentData} from '../../../modules/types'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

export type CreateItemType = {
  category: ItemCategory
  count: number
  details: string
  name: string
  price: number
}

export type CreateProps = {
  data: CreateItemType
  file?: File
}

export const useAddItem = () => {
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const isAdded = useAppSelector(selectIsAdded)
  const isAdding = useAppSelector(selectIsAdding)
  const isDisabled = isAdded || isAdding

  useEffect(() => {
    return () => {
      // only reset if data was actually added
      if (isAdded) {
        dispatch(reset())
      }
    }
  }, [isAdded])

  const onStartAdd = useCallback(() => {
    dispatch(add())
  }, [dispatch])

  const onSuccessfulAdd = useCallback(
    (data: ItemDocumentData) => {
      dispatch(added())
      dispatch(insert(data))
    },
    [dispatch]
  )

  const onCreate = async ({data, file}: CreateProps) => {
    const docRef = await addDoc(collection(db, 'finished-items'), data)
    const id = docRef.id
    await onCreateImage({id, file})
    return await onResolve(id)
  }

  const handleAddItem = async ({data, file}: CreateProps) => {
    onStartAdd()
    const result = await onCreate({data, file})
      .then(async docData => {
        // this should not be happening in reality, but just to be save...
        if (!docData) {
          throw Error('Document was not found')
        }
        onSuccessfulAdd(docData as ItemDocumentData)
        return docData
      })
      .catch(error => {
        dispatch(addingError(error as Error))
        throw error
      })

    return result
  }

  return {
    handleAddItem,
    isAdded,
    isAdding,
    isDisabled
  }
}
