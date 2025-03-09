import {useCallback, useEffect} from 'react'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes} from 'firebase/storage'

import {CollectionType} from '../../HomePage/types'
import {onResolveData} from '../../../hooks/use-resolve'
import {
  add,
  added,
  addingError,
  reset,
  selectIsAdded,
  selectIsAdding,
  selectIsbn,
  selectColor
} from '../../../modules/gruendl/add/slice'
import {insert as cottonQuickInsert} from '../../../modules/cotton-quick/home/slice'
import {insert as cottonQuickListInsert} from '../../../modules/cotton-quick/results/slice'
import {insert as cottonQuickPrintInsert} from '../../../modules/cotton-quick-print/home/slice'
import {insert as cottonQuickPrintListInsert} from '../../../modules/cotton-quick-print/results/slice'
import {insert as funnyUniInsert} from '../../../modules/funny-uni/home/slice'
import {insert as funnyUniListInsert} from '../../../modules/funny-uni/results/slice'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {WoolDocumentData} from '../../../modules/types'

import {CreateItemDataType} from './use-add'

export const useAddGruendl = () => {
  const dispatch = useAppDispatch()
  const db = getFirestore()

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
      if (collection === 'cotton-quick') {
        dispatch(cottonQuickListInsert(data))
        dispatch(cottonQuickInsert(data))
      } else if (collection === 'cotton-quick-print') {
        dispatch(cottonQuickPrintListInsert(data))
        dispatch(cottonQuickPrintInsert(data))
      } else if (collection === 'funny-uni') {
        dispatch(funnyUniListInsert(data))
        dispatch(funnyUniInsert(data))
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
    await onCreate(data, collection, file)
      .then(async docData => {
        await onCreateImage({collection, color: data.color, file})
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
