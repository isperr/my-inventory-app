import {ChangeEvent, useState} from 'react'

const VisuallyHiddenInput = () => {
  const [preview, setPreview] = useState<string | undefined>(undefined)

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = (event.target as HTMLInputElement).files

    if (files?.length) {
      setPreview(URL.createObjectURL(files[0]))
    }
  }

  return (
    <>
      {preview && <img src={preview} />}
      <input
        accept="image/png"
        type="file"
        onChange={onChange}
        style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
          whiteSpace: 'nowrap',
          width: 1
        }}
      />
    </>
  )
}

export default VisuallyHiddenInput
