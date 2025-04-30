import {getDownloadURL, getStorage, ref} from 'firebase/storage'
import {doc, DocumentData, getDoc, getFirestore} from 'firebase/firestore'

import {ItemDocumentData} from '../../modules/types'

const handleImageResolving = async (data: DocumentData, id: string) => {
  const storage = getStorage()
  const imgRef = ref(storage, `finished-items/${id}.png`)
  const temp = {...data}

  await getDownloadURL(imgRef)
    .then(url => {
      temp.imgUrl = url
    })
    .catch(error => {
      // error.code reference https://firebase.google.com/docs/storage/web/handle-errors
      // to take care of wool-images that does not have an img uploaded
      if (error.code === 'storage/object-not-found') {
        temp.imgUrl = null
        return
      }
      // error is handled within ItemDetailPage
      throw error
    })

  return temp as ItemDocumentData
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

  return await handleImageResolving({...data, id}, id)
}
