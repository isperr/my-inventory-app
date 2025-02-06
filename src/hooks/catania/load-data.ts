import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
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
  const imgObj: ImageRefObj = {}
  const allowedColors = data.map(it => it.color.toString())

  await listAll(listRef)
    .then(async it => {
      await Promise.all(
        it.items // filter out all images that are not fetched or UNKNOWN (as backup)
          .filter(it =>
            allowedColors.includes(
              it.name.replace(new RegExp(PREFXIES.join('|')), '') ||
                it.name === `${UNKNOWN}.png`
            )
          )
          .map(
            async pr =>
              (imgObj[pr.name.replace(new RegExp(PREFXIES.join('|')), '')] =
                await getDownloadURL(pr))
          )
      )
    })
    .catch(error => {
      // error is handled within ListPage
      throw error
    })

  return await data.map(it => ({
    ...it,
    imgUrl: it.name === UNKNOWN ? null : imgObj[it.color.toString()]
  }))
}

export const onLoadData = async () => {
  const db = getFirestore()

  const temp: DocumentData[] = []

  const collectionRef = collection(db, 'catania')
  const cataniaQuery = await query(collectionRef, orderBy('color', 'asc'))
  const snapshot = await getDocs(cataniaQuery).catch(error => {
    // error is handled within ListPage
    throw error
  })
  snapshot.forEach(doc => {
    temp.push(doc.data())
  })

  return await handleImageLoading(temp)
}

export const onLoadPreviewData = async () => {
  const db = getFirestore()

  const temp: DocumentData[] = []

  const collectionRef = collection(db, 'catania')
  const cataniaQuery = await query(
    collectionRef,
    orderBy('color', 'asc'),
    limit(3)
  )
  const snapshot = await getDocs(cataniaQuery).catch(error => {
    // error is handled within ListPage
    throw error
  })
  snapshot.forEach(doc => {
    temp.push(doc.data())
  })

  return await handleImageLoading(temp)
}
