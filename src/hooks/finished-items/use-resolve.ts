import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import {doc, getDoc, getFirestore} from 'firebase/firestore'

import {ExtraImageType, ItemDocumentData} from '../../modules/types'

export const handlePreviewImageResolve = async (id: string) => {
  const storage = getStorage()
  const imgRef = ref(storage, `finished-items/${id}-preview.png`)
  let preview: undefined | string = undefined

  await getDownloadURL(imgRef)
    .then(url => {
      preview = url
    })
    .catch(error => {
      // error.code reference https://firebase.google.com/docs/storage/web/handle-errors
      // to take care of wool-images that does not have an img uploaded
      if (error.code === 'storage/object-not-found') {
        preview = undefined
        return
      }
      // error is handled within ItemDetailPage
      throw error
    })

  return preview
}

export const handleExtraImagesResolve = async (id: string) => {
  const storage = getStorage()
  const folderRef = ref(storage, `finished-items/${id}`)
  const images: Array<ExtraImageType> = []

  await listAll(folderRef)
    .then(
      async it =>
        await Promise.all(
          it.items.map(async pr => {
            const imgUrl = await getDownloadURL(pr)
            images.push({name: pr.name, imgUrl})
          })
        )
    )
    .catch(error => {
      // error is handled within ItemDetailPage
      throw error
    })

  return images
}

export const onResolve = async (id: string) => {
  const db = getFirestore()

  const docRef = doc(db, 'finished-items', id)
  const docSnap = await getDoc(docRef).catch(error => {
    // error is handled within ItemDetailPage
    throw error
  })
  const data = docSnap.data()

  if (!data) {
    return undefined
  }

  const preview = await handlePreviewImageResolve(id)
  const images = await handleExtraImagesResolve(id)

  return {...data, id, imgUrl: preview, images} as ItemDocumentData
}
