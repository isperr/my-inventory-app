import {getDownloadURL, getStorage, ref} from 'firebase/storage'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore'

import {CataniaDocumentData} from '../../../modules/catania/results/slice'

const handleImageResolving = async (data: DocumentData, id: string) => {
  const storage = getStorage()
  const imgRef = ref(storage, `catania/${id}.png`)
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
      // error is handled within ColorPage
      throw error
    })

  return temp as CataniaDocumentData
}

export const onResolveData = async (id: string) => {
  const db = getFirestore()

  const docRef = doc(db, 'catania', id)
  const docSnap = await getDoc(docRef).catch(error => {
    // error is handled within ColorPage
    throw error
  })
  const data = docSnap.data()

  if (!data) {
    return undefined
  }

  return await handleImageResolving(data, id)
}

export const onResolveDataByGivenData = async ({
  data,
  isColorSearch
}: {
  data: number
  isColorSearch: boolean
}) => {
  const db = getFirestore()
  const cataniaRef = collection(db, 'catania')
  const woolQuery = isColorSearch
    ? query(cataniaRef, where('color', '==', data))
    : query(cataniaRef, where('ISBN', '==', data))

  const woolSnaps = await getDocs(woolQuery).catch(error => {
    // error is handled within ColorPage
    throw error
  })
  const temp: DocumentData[] = []
  woolSnaps.forEach(doc => {
    temp.push(doc.data())
  })

  if (!temp.length) {
    return undefined
  }

  return await handleImageResolving(temp[0], temp[0].color.toString())
}
