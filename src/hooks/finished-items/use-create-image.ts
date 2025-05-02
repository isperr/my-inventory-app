import {getStorage, ref, uploadBytes} from 'firebase/storage'

export const onCreateImage = async ({
  file,
  name
}: {
  file?: File
  name: string
}) => {
  if (!file) {
    return
  }
  const storage = getStorage()
  const storageRef = ref(storage, `finished-items/${name}`)

  await uploadBytes(storageRef, file).catch(error => {
    throw error
  })
}
