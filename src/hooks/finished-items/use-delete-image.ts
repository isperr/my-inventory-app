import {deleteObject, getStorage, ref} from 'firebase/storage'

export const onDeleteImage = async ({name}: {name: string}) => {
  const storage = getStorage()
  const storageRef = ref(storage, `finished-items/${name}`)

  await deleteObject(storageRef).catch(error => {
    throw error
  })
}
