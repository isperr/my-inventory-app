import {getStorage, ref, uploadBytes} from 'firebase/storage'

export const onCreateImage = async ({id, file}: {id: string; file?: File}) => {
  if (!file) {
    return
  }
  const storage = getStorage()
  const storageRef = ref(storage, `finished-items/${id}.png`)

  await uploadBytes(storageRef, file).catch(error => {
    throw error
  })
}
