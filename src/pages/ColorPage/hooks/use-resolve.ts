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

const UNKNOWN = 'UNBEKANNT'
const TEST_NAME = 'test'

const handleImageResolving = async (data: DocumentData, id: string) => {
  // do not resolve for image if it name === "UNBEKANNT"
  // or anything including "test" for now - should be removed later on
  if (data.name === UNKNOWN || data.name.toLowerCase().includes(TEST_NAME)) {
    return {...data, imgUrl: null}
  }

  const storage = getStorage()
  const imgRef = ref(storage, `catania/${id}.png`)
  const temp = {...data}

  await getDownloadURL(imgRef)
    .then(url => {
      temp.imgUrl = url
    })
    .catch(error => {
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

export const onResolveDataByIsbn = async (isbn: number) => {
  const db = getFirestore()
  const cataniaRef = collection(db, 'catania')
  const woolQuery = query(cataniaRef, where('ISBN', '==', isbn))

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
