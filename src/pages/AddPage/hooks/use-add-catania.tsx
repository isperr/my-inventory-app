import {useCallback, useEffect} from 'react'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes} from 'firebase/storage'

import {
  add,
  added,
  addingError,
  reset,
  selectIsAdded,
  selectIsAdding,
  selectIsbn,
  selectColor
} from '../../../modules/catania/add/slice'
import {insert as homeInsert} from '../../../modules/catania/home/slice'
import {
  CataniaDocumentData,
  insert as listInsert
} from '../../../modules/catania/results/slice'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

type CreateItemDataType = {
  color: number
  count: number
  ISBN: number
  isActivated: boolean
  name: string
}

export const useAddCatania = () => {
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const color = useAppSelector(selectColor)
  const isbn = useAppSelector(selectIsbn)
  const isAdding = useAppSelector(selectIsAdding)
  const isAdded = useAppSelector(selectIsAdded)
  const isDisabled = isAdded || isAdding

  const onCreate = async (data: CreateItemDataType) => {
    await setDoc(doc(db, 'catania', data.color.toString()), data).catch(
      error => {
        // error is handled within handleSubmit
        throw error
      }
    )
    const cataniaDoc = await getDoc(doc(db, 'catania', data.color.toString()))
    return {...cataniaDoc.data(), imgUrl: null}
  }

  const onCreateImage = async ({color, file}: {color: number; file?: File}) => {
    if (!file) {
      return
    }
    const storage = getStorage()
    const storageRef = ref(storage, `catania/${color}.png`)

    await uploadBytes(storageRef, file).catch(error => {
      throw error
    })
  }

  const onStartAdd = useCallback(() => {
    dispatch(add())
  }, [dispatch])

  const onSuccessfulAdd = useCallback(
    (data: CataniaDocumentData) => {
      dispatch(added())
      dispatch(listInsert(data))
      dispatch(homeInsert(data))
    },
    [dispatch]
  )

  const handleAdd = async (data: CreateItemDataType, file?: File) => {
    onStartAdd()
    await onCreate(data)
      .then(async docData => {
        await onCreateImage({color: data.color, file})
        onSuccessfulAdd(docData)
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
