import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {useCallback, useEffect} from 'react'

import {onCreateImage} from '../../../hooks/finished-items/use-create-image'
import {onDeleteImage} from '../../../hooks/finished-items/use-delete-image'
import {handleImageResolving} from '../../../hooks/finished-items/use-resolve'
import {
  update,
  updateError,
  updated,
  resetUpdate
} from '../../../modules/finished-items/results/slice'
import {ItemDocumentData} from '../../../modules/types'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {useNotifications} from '@toolpad/core'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {
  selectIsUpdated,
  selectIsUpdating
} from '../../../modules/finished-items/results/selectors'
import {useToggleEditMode} from './use-toggle-edit-mode'

export const useUpdateItem = () => {
  const notifications = useNotifications()
  const dispatch = useAppDispatch()
  const db = getFirestore()
  const {leaveEditMode} = useToggleEditMode()

  const isUpdated = useAppSelector(selectIsUpdated)
  const isUpdating = useAppSelector(selectIsUpdating)

  const handleImage = async ({
    file,
    hasFileChange,
    id,
    imgUrl
  }: {
    file?: File
    hasFileChange: boolean
    id: string
    imgUrl?: string
  }) => {
    if (!hasFileChange) {
      return imgUrl
    }

    if (file) {
      await onCreateImage({id, file})
      return await handleImageResolving(id)
    }
    await onDeleteImage({id})
    return undefined
  }

  const handleUpdateItem = useCallback(
    async ({
      data,
      file,
      hasFieldsChange,
      hasFileChange,
      id,
      imgUrl: prevImgUrl
    }: {
      data: Partial<ItemDocumentData>
      file?: File
      hasFieldsChange: boolean
      hasFileChange: boolean
      id: string
      imgUrl?: string
    }) => {
      const ref = doc(db, 'finished-items', id)
      try {
        dispatch(update())

        if (hasFieldsChange) {
          await setDoc(ref, data, {merge: true})
        }
        const imgUrl = await handleImage({
          file,
          hasFileChange,
          id,
          imgUrl: prevImgUrl
        })

        dispatch(updated({data: {...data, imgUrl}, id}))
        notifications.show(
          `Das Werk wurde erfolgreich bearbeitet.`,
          getToastConfig({autoHideDuration: 3000, severity: 'success'})
        )
        leaveEditMode()
      } catch (error) {
        dispatch(updateError(error as Error))
        notifications.show(
          `Beim Bearbeiten des Werks ist leider ein Fehler aufgetreten.`,
          getToastConfig({})
        )
      }
    },
    [db]
  )

  useEffect(() => {
    return () => {
      // only reset if data was actually updated
      if (isUpdated) {
        dispatch(resetUpdate())
      }
    }
  }, [isUpdated])

  return {isUpdated, isUpdating, handleUpdateItem}
}
