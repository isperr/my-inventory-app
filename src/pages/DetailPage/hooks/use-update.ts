import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {useCallback} from 'react'

import {useToasts} from './use-toats'
import {getUpdateActions, getUpdateSelectors} from '../utils/get-slice'
import {CollectionType} from '../../HomePage/types'

export const useUpdate = (collection: CollectionType, color?: string) => {
  const {updateErrorToast, updateSuccessToast} = useToasts()
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const {update, updateError, updated} = getUpdateActions(collection)
  const {selectIsUpdatingType} = getUpdateSelectors(collection)
  const isUpdatingAdd = useAppSelector(selectIsUpdatingType('add'))
  const isUpdatingRemove = useAppSelector(selectIsUpdatingType('remove'))

  const onUpdateCount = useCallback(
    (updatedCount: number, type: 'add' | 'remove') => {
      if (!color) {
        return
      }
      const ref = doc(db, collection, color)
      try {
        dispatch(update(type))
        setDoc(ref, {count: updatedCount}, {merge: true})
        dispatch(updated({field: 'count', id: color, value: updatedCount}))
        updateSuccessToast(type)
      } catch (error) {
        dispatch(updateError(error as Error))
        updateErrorToast(type)
      }
    },
    [collection, color, db]
  )

  const onConfirmChangeIsActivated = useCallback(
    (isActivated: boolean, closeDialog: () => void) => {
      const type = isActivated ? 'activate' : 'deactivate'

      if (!color) {
        return
      }
      const ref = doc(db, collection, color)
      try {
        dispatch(update(type))
        setDoc(ref, {isActivated}, {merge: true})
        dispatch(updated({field: 'isActivated', id: color, value: isActivated}))
        closeDialog()
        updateSuccessToast(type)
      } catch (error) {
        dispatch(updateError(error as Error))
        updateErrorToast(type)
      }
    },
    [collection, color, db]
  )

  return {
    isUpdatingAdd,
    isUpdatingRemove,
    onUpdateCount,
    onConfirmChangeIsActivated
  }
}
