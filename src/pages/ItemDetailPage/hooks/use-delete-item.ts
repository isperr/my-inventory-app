import {deleteDoc, doc, getFirestore} from 'firebase/firestore'
import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {useNotifications} from '@toolpad/core'

import {onDeleteImage} from '../../../hooks/finished-items/use-delete-image'
import {
  deleteItem,
  deleteItemError,
  deletedItem,
  resetDeleteItem
} from '../../../modules/finished-items/results/slice'
import {
  selectIsDeleted,
  selectIsDeleting
} from '../../../modules/finished-items/results/selectors'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

export const useDeleteItem = () => {
  const notifications = useNotifications()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const db = getFirestore()

  const isDeleted = useAppSelector(selectIsDeleted)
  const isDeleting = useAppSelector(selectIsDeleting)

  const handleDeleteItem = useCallback(
    async ({
      closeDialog,
      hasImage,
      id
    }: {
      closeDialog: () => void
      hasImage: boolean
      id: string
    }) => {
      try {
        dispatch(deleteItem())

        await deleteDoc(doc(db, 'finished-items', id))
        if (hasImage) {
          await onDeleteImage({id})
        }

        navigate('/finished-items/')
        dispatch(deletedItem(id))
        notifications.show(
          `Das fertige Werk wurde erfolgreich gelöscht.`,
          getToastConfig({autoHideDuration: 3000, severity: 'success'})
        )
        closeDialog()
      } catch (error) {
        dispatch(deleteItemError(error as Error))
        notifications.show(
          `Beim Löschen des fertigen Werks ist leider ein Fehler aufgetreten.`,
          getToastConfig({})
        )
      }
    },
    [db]
  )

  useEffect(() => {
    return () => {
      // only reset if data was actually deleted
      if (isDeleted) {
        dispatch(resetDeleteItem())
      }
    }
  }, [isDeleted])

  return {isDeleted, isDeleting, handleDeleteItem}
}
