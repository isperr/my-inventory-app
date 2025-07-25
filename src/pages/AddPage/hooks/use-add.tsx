import {useCallback, useEffect} from 'react'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes} from 'firebase/storage'

import {CollectionType} from '../../HomePage/types'
import {onResolveData} from '../../../hooks/use-resolve'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {
  add,
  added,
  addingError,
  reset,
  selectIsAdded,
  selectIsAdding,
  selectIsbn,
  selectColor
} from '../../../modules/wool/add/slice'
import {WoolDocumentData} from '../../../modules/types'

import {useInsert} from './use-insert'

export type CreateItemDataType = {
  color: number
  count: number
  ISBN: number
  isActivated: boolean
  name: string
}

export const useAdd = () => {
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const {handleInsert} = useInsert()

  const color = useAppSelector(selectColor)
  const isbn = useAppSelector(selectIsbn)
  const isAdding = useAppSelector(selectIsAdding)
  const isAdded = useAppSelector(selectIsAdded)
  const isDisabled = isAdded || isAdding

  const onCreateImage = async ({
    collection,
    color,
    file
  }: {
    collection: CollectionType
    color: number
    file?: File
  }) => {
    if (!file) {
      return
    }
    const storage = getStorage()
    const storageRef = ref(storage, `${collection}/${color}.png`)

    await uploadBytes(storageRef, file).catch(error => {
      throw error
    })
  }

  const onCreate = async (
    data: CreateItemDataType,
    collection: CollectionType,
    file?: File
  ) => {
    const id = data.color.toString()
    await setDoc(doc(db, collection, id), data).catch(error => {
      // error is handled within handleSubmit
      throw error
    })
    await onCreateImage({collection, color: data.color, file})
    return await onResolveData(id, collection)
  }

  const onStartAdd = useCallback(() => {
    dispatch(add())
  }, [dispatch])

  const onSuccessfulAdd = useCallback(
    (data: WoolDocumentData, collection: CollectionType) => {
      dispatch(added())
      handleInsert(data, collection)
    },
    [dispatch, handleInsert]
  )

  const handleAdd = async ({
    collection,
    data,
    file
  }: {
    collection: CollectionType
    data: CreateItemDataType
    file?: File
  }) => {
    onStartAdd()
    await onCreate(data, collection, file)
      .then(async docData => {
        // this should not be happening in reality, but just to be save...
        if (!docData) {
          throw Error('Document was not found')
        }
        onSuccessfulAdd(docData, collection)
      })
      .catch(error => {
        dispatch(addingError(error as Error))
        throw error
      })
  }

  useEffect(() => {
    return () => {
      // only reset if data was actually added
      if (isAdded) {
        dispatch(reset())
      }
    }
  }, [isAdded])

  return {
    color,
    isAdded,
    isAdding,
    isDisabled,
    isbn,
    handleAdd
  }
}
