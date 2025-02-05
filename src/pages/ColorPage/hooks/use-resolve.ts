import {getDownloadURL, getStorage, ref} from 'firebase/storage'
import {doc, DocumentData, getDoc, getFirestore} from 'firebase/firestore'
import {CataniaDocumentData} from '../../../modules/catania/slice'

const UNKNOWN = 'UNBEKANNT'

const handleImageResolving = async (data: DocumentData, id: string) => {
  // do not resolve for image if it name === "UNBEKANNT"
  if (data.name === UNKNOWN) {
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
