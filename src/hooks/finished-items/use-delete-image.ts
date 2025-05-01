import {deleteObject, getStorage, ref} from 'firebase/storage'

export const onDeleteImage = async ({id}: {id: string}) => {
  const storage = getStorage()
  const storageRef = ref(storage, `finished-items/${id}.png`)

  await deleteObject(storageRef).catch(error => {
    throw error
  })
}
