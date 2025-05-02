import {ChangeEvent, useRef} from 'react'
import {isEqual} from 'lodash'
import {twMerge} from 'tailwind-merge'
import {Button, IconButton, Paper} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'

export type MultiImageType = {imgUrl: string; file?: File; name: string}

const MultiImageUpload = ({
  images,
  isDisabled,
  setImages
}: {
  images: Array<MultiImageType>
  isDisabled: boolean
  setImages: (images: Array<MultiImageType>) => void
}) => {
  const imgRef = useRef<HTMLInputElement | null>(null)

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = (event.target as HTMLInputElement).files

    if (files?.length) {
      const fileUrls = Array.from(files).map(file => ({
        imgUrl: URL.createObjectURL(file),
        file: file,
        name: file.name
      }))
      setImages([...images, ...fileUrls])
    }
  }

  const resetImage = (imgUrl: string, file?: File) => {
    if (imgRef.current?.files) {
      //imgRef.current.value = ''

      if (file) {
        const dt = new DataTransfer()
        const files = Array.from(imgRef.current.files)

        files.forEach(currFile => {
          if (!isEqual(currFile, file)) {
            dt.items.add(currFile)
          }
        })

        imgRef.current.files = dt.files
      }
    }

    setImages(images.filter(it => it.imgUrl !== imgUrl))
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {images.map(({imgUrl, file}, idx) => (
          <Paper
            className="col-span-1 flex justify-center items-center text-[#f4f3f2]"
            component="label"
            tabIndex={-1}
            role={undefined}
            key={imgUrl}
          >
            <img
              className={twMerge('h-[100px] w-full m-auto object-contain')}
              alt={`Preview ` + (idx + 1)}
              src={imgUrl}
            />
            <IconButton
              aria-label="remove"
              className="absolute"
              color="secondary"
              disabled={isDisabled}
              onClick={() => resetImage(imgUrl, file)}
            >
              <DeleteIcon
                color="inherit"
                className="text-[3.5rem]"
                fontSize="inherit"
              />
            </IconButton>
          </Paper>
        ))}
      </div>
      <Button
        className="mb-6 w-fit mx-auto"
        color={images.length ? 'success' : 'primary'}
        component="label"
        disabled={isDisabled}
        role={undefined}
        startIcon={<CloudUploadIcon />}
        tabIndex={-1}
        variant="contained"
      >
        Mehr Bilder hochladen
        <input
          ref={imgRef}
          id="images"
          accept="image/*"
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
          multiple
        />
      </Button>
    </>
  )
}

export default MultiImageUpload
