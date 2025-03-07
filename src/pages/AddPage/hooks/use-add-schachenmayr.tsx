import {useCallback, useEffect} from 'react'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes} from 'firebase/storage'

import {CollectionType} from '../../HomePage/types'
import {
  add,
  added,
  addingError,
  reset,
  selectIsAdded,
  selectIsAdding,
  selectIsbn,
  selectColor
} from '../../../modules/schachenmayr/add/slice'
import {insert as cottonQuickInsert} from '../../../modules/cotton-quick/home/slice'
import {insert as cottonQuickListInsert} from '../../../modules/cotton-quick/results/slice'
import {WoolDocumentData} from '../../../modules/types'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

import {CreateItemDataType} from './use-add'

export const useAddSchachenmayr = () => {
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const color = useAppSelector(selectColor)
  const isbn = useAppSelector(selectIsbn)
  const isAdding = useAppSelector(selectIsAdding)
  const isAdded = useAppSelector(selectIsAdded)
  const isDisabled = isAdded || isAdding

  const onCreate = async (
    data: CreateItemDataType,
    collection: CollectionType
  ) => {
    await setDoc(doc(db, collection, data.color.toString()), data).catch(
      error => {
        // error is handled within handleSubmit
        throw error
      }
    )
    const cataniaDoc = await getDoc(doc(db, collection, data.color.toString()))
    return {...cataniaDoc.data(), imgUrl: null}
  }

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

  const onStartAdd = useCallback(() => {
    dispatch(add())
  }, [dispatch])

  const onSuccessfulAdd = useCallback(
    (data: WoolDocumentData, collection: CollectionType) => {
      dispatch(added())
      if (collection === 'cotton-quick') {
        dispatch(cottonQuickListInsert(data))
        dispatch(cottonQuickInsert(data))
      }
    },
    [dispatch]
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
    await onCreate(data, collection)
      .then(async docData => {
        await onCreateImage({collection, color: data.color, file})
        onSuccessfulAdd(docData, collection)
      })
      .catch(error => {
        dispatch(addingError(error as Error))
        throw error
      })
  }

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  return {
    color,
    isAdded,
    isAdding,
    isDisabled,
    isbn,
    handleAdd
  }
}
