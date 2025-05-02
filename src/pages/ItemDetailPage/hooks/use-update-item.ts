import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {useCallback} from 'react'

import {onCreateImage} from '../../../hooks/finished-items/use-create-image'
import {onDeleteImage} from '../../../hooks/finished-items/use-delete-image'
import {
  handleExtraImagesResolve,
  handlePreviewImageResolve
} from '../../../hooks/finished-items/use-resolve'
import {
  update,
  updateError,
  updated,
  resetUpdate
} from '../../../modules/finished-items/results/slice'
import {ExtraImageType, ItemDocumentData} from '../../../modules/types'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'
import {useNotifications} from '@toolpad/core'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {
  selectIsUpdated,
  selectIsUpdating
} from '../../../modules/finished-items/results/selectors'
import {useToggleEditMode} from './use-toggle-edit-mode'
import {MultiImageType} from '../components/MultiImageUpload'

export const useUpdateItem = () => {
  const notifications = useNotifications()
  const dispatch = useAppDispatch()
  const db = getFirestore()
  const {leaveEditMode} = useToggleEditMode()

  const isUpdated = useAppSelector(selectIsUpdated)
  const isUpdating = useAppSelector(selectIsUpdating)

  const handleImages = async ({
    hasImagesChange,
    id,
    newImages,
    prevImages
  }: {
    hasImagesChange: boolean
    id: string
    newImages: Array<MultiImageType>
    prevImages: Array<ExtraImageType>
  }) => {
    if (!hasImagesChange) {
      return prevImages
    }

    const imgToCreate = newImages.filter(img => img.file)
    const imgToDelete = prevImages
      .filter(img => !newImages.find(item => item.imgUrl === img.imgUrl))
      .map(it => it.name)

    // delete all images that were deleted
    if (imgToDelete.length) {
      await Promise.all(
        imgToDelete.map(
          async imgName => await onDeleteImage({name: `${id}/${imgName}`})
        )
      )
    }
    // if there are images to create, then create them and resolve all images again right after
    if (imgToCreate.length) {
      await Promise.all(
        imgToCreate.map(
          async ({file, name}) =>
            await onCreateImage({file, name: `${id}/${name}`})
        )
      )
      return await handleExtraImagesResolve(id)
    }

    // if there were no images to create only filter out deleted images
    return prevImages.filter(img =>
      newImages.find(item => item.imgUrl === img.imgUrl)
    )
  }

  const handlePreview = async ({
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
      await onCreateImage({file, name: `${id}-preview.png`})
      return await handlePreviewImageResolve(id)
    }
    await onDeleteImage({name: `${id}-preview.png`})
    return undefined
  }

  const handleUpdateItem = useCallback(
    async ({
      data,
      hasFieldsChange,
      hasFileChange,
      hasImagesChange,
      id,
      images: newImages,
      imgUrl: prevImgUrl,
      preview,
      prevImages
    }: {
      data: Partial<ItemDocumentData>
      hasFieldsChange: boolean
      hasFileChange: boolean
      hasImagesChange: boolean
      id: string
      images: Array<MultiImageType>
      imgUrl?: string
      preview?: File
      prevImages: Array<ExtraImageType>
    }) => {
      const ref = doc(db, 'finished-items', id)
      try {
        dispatch(update())

        if (hasFieldsChange) {
          await setDoc(ref, data, {merge: true})
        }
        const imgUrl = await handlePreview({
          file: preview,
          hasFileChange,
          id,
          imgUrl: prevImgUrl
        })
        const images = await handleImages({
          hasImagesChange,
          id,
          newImages,
          prevImages
        })

        dispatch(updated({data: {...data, images, imgUrl}, id}))
        notifications.show(
          `Das Werk wurde erfolgreich bearbeitet.`,
          getToastConfig({autoHideDuration: 3000, severity: 'success'})
        )
        leaveEditMode()
        dispatch(resetUpdate())
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

  return {isUpdated, isUpdating, handleUpdateItem}
}
