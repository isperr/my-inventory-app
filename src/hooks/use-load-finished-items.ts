import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore'
import {BaseItemDocumentData} from '../modules/types'

const IMG_PREFIXES = ['.png', '.jpg', '.jpeg', '.svg', '.tif', '.tiff', '.webp']

export type ImageRefObj = {
  [key: string]: string
}

const handleImageLoading = async (data: BaseItemDocumentData[]) => {
  const storage = getStorage()
  const listRef = ref(storage, 'finished-items')
  const imgObj: ImageRefObj = {}

  const allowedIds = data.map(it => it.id)

  await listAll(listRef)
    .then(async it => {
      await Promise.all(
        it.items // filter out all images that are not fetched or UNKNOWN (as backup)
          .filter(it =>
            allowedIds.includes(
              it.name.replace(new RegExp(IMG_PREFIXES.join('|')), '')
            )
          )
          .map(
            async pr =>
              (imgObj[pr.name.replace(new RegExp(IMG_PREFIXES.join('|')), '')] =
                await getDownloadURL(pr))
          )
      )
    })
    .catch(error => {
      // error is handled within ItemListPage
      throw error
    })

  return await data.map(it => ({
    ...it,
    imgUrl: imgObj[it.id]
  }))
}

export const onLoadFinishedItems = async () => {
  const db = getFirestore()

  const temp: BaseItemDocumentData[] = []

  const collectionRef = collection(db, 'finished-items')
  const itemQuery = await query(collectionRef, orderBy('name', 'asc'))
  const snapshot = await getDocs(itemQuery).catch(error => {
    // error is handled within ItemListPage
    throw error
  })
  snapshot.forEach(doc => {
    temp.push({...doc.data(), id: doc.id})
  })

  return await handleImageLoading(temp)
}
