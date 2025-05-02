import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore'
import {
  BaseItemDocumentData,
  ExtraImageType,
  ItemCategory
} from '../../modules/types'

const IMG_PREFIXES = ['.png', '.jpg', '.jpeg', '.svg', '.tif', '.tiff', '.webp']

export type ImageRefObj = {
  [key: string]: string
}

export type ImagesRefObj = {
  [key: string]: Array<ExtraImageType>
}

const handleImageLoading = async (data: BaseItemDocumentData[]) => {
  const storage = getStorage()
  const listRef = ref(storage, 'finished-items')
  const prevObj: ImageRefObj = {}
  const imagesObj: ImagesRefObj = {}

  const allowedIds = data.map(it => `${it.id}-preview`)

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
              (prevObj[
                pr.name.replace(new RegExp(IMG_PREFIXES.join('|')), '')
              ] = await getDownloadURL(pr))
          )
      )
    })
    .catch(error => {
      // error is handled within ItemListPage
      throw error
    })

  await Promise.all(
    data.map(
      async item =>
        await listAll(ref(storage, `finished-items/${item.id}`))
          .then(async it => {
            await Promise.all(
              it.items.map(async pr => {
                const temp = await getDownloadURL(pr)
                imagesObj[item.id] = [
                  ...(imagesObj[item.id] ?? []),
                  {name: pr.name, imgUrl: temp}
                ]
              })
            )
          })
          .catch(error => {
            // error is handled within ItemDetailPage
            throw error
          })
    )
  )

  return await data.map(it => ({
    ...it,
    images: imagesObj[it.id] ?? [],
    imgUrl: prevObj[`${it.id}-preview`]
  }))
}

export const onLoad = async () => {
  const db = getFirestore()

  const temp: BaseItemDocumentData[] = []

  const collectionRef = collection(db, 'finished-items')
  const itemQuery = await query(collectionRef, orderBy('name', 'asc'))
  const snapshot = await getDocs(itemQuery).catch(error => {
    // error is handled within ItemListPage
    throw error
  })
  snapshot.forEach(doc => {
    const data = doc.data()

    temp.push({
      ...data,
      category: (data.category satisfies ItemCategory) ? data.category : null,
      id: doc.id
    })
  })

  return await handleImageLoading(temp)
}
