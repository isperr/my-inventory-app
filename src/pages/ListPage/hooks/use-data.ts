import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore'

const PREFXIES = ['.png', '.jpg']
const UNKNOWN = 'UNBEKANNT'

export type ImageRefObj = {
  [key: string]: string
}

const handleImageLoading = async (data: DocumentData[]) => {
  const storage = getStorage()
  const listRef = ref(storage, 'catania')
  const testi: ImageRefObj = {}

  await listAll(listRef)
    .then(async it => {
      await Promise.all(
        it.items.map(
          async pr =>
            (testi[pr.name.replace(new RegExp(PREFXIES.join('|')), '')] =
              await getDownloadURL(pr))
        )
      )
    })
    .catch(error => {
      // TODO: add some error-handling
      console.error('error', error)
    })

  return await data.map(it => {
    const idx = testi[it.color.toString() ?? UNKNOWN]
    return {...it, imgUrl: idx}
  })
}

export const onLoadData = async () => {
  const db = getFirestore()

  const temp: DocumentData[] = []

  const collectionRef = collection(db, 'catania')
  const cataniaQuery = await query(collectionRef, orderBy('color', 'asc'))
  const snapshot = await getDocs(cataniaQuery)
  console.log(snapshot)
  snapshot.forEach(doc => {
    temp.push(doc.data())
  })

  return await handleImageLoading(temp)
}
