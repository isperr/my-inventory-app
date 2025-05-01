import {getDownloadURL, getStorage, ref} from 'firebase/storage'
import {doc, getDoc, getFirestore} from 'firebase/firestore'

import {ItemDocumentData} from '../../modules/types'

export const handleImageResolving = async (id: string) => {
  const storage = getStorage()
  const imgRef = ref(storage, `finished-items/${id}.png`)
  let temp: undefined | string = undefined

  await getDownloadURL(imgRef)
    .then(url => {
      temp = url
    })
    .catch(error => {
      // error.code reference https://firebase.google.com/docs/storage/web/handle-errors
      // to take care of wool-images that does not have an img uploaded
      if (error.code === 'storage/object-not-found') {
        temp = undefined
        return
      }
      // error is handled within ItemDetailPage
      throw error
    })

  return temp
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

  const imgUrl = await handleImageResolving(id)

  return {...data, id, imgUrl} as ItemDocumentData
}
