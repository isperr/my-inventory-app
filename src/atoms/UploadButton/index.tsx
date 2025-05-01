import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {Box, Button, IconButton} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'

const UploadButton = ({
  imgUrl,
  isDisabled,
  isRounded = false,
  setHasFileChange
}: {
  imgUrl?: string
  isDisabled: boolean
  isRounded?: boolean
  setHasFileChange?: (hasFileChange: boolean) => void
}) => {
  const imgRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(imgUrl)

  useEffect(() => {
    if (setHasFileChange && preview !== imgUrl) {
      setHasFileChange(true)
    }
  }, [setHasFileChange, preview, imgUrl])

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = (event.target as HTMLInputElement).files

    if (files?.length) {
      setPreview(URL.createObjectURL(files[0]))
    }
  }

  const resetImage = () => {
    setPreview(undefined)
    if (imgRef.current) {
      imgRef.current.value = ''
    }
  }

  return (
    <>
      {!preview && (
        <Box
          className={twMerge(
            'w-[300px] h-[170px] mx-auto text-[4rem]',
            'bg-[#bdbdbd] flex justify-center items-center text-[#f4f3f2]',
            isRounded && 'rounded-full',
            !isRounded && 'w-full mx-0'
          )}
        >
          <ImageIcon color="inherit" fontSize="inherit" />
        </Box>
      )}
      {preview && (
        <Box
          className="flex justify-center items-center text-[#f4f3f2]"
          component="label"
          tabIndex={-1}
          role={undefined}
        >
          <img
            className={twMerge(
              'h-[170px] w-[300px] m-auto',
              !isRounded && 'object-contain w-full'
            )}
            alt="upload-image"
            src={preview}
          />
          <IconButton
            aria-label="remove"
            className="absolute"
            color="secondary"
            disabled={isDisabled}
            onClick={resetImage}
          >
            <DeleteIcon
              color="inherit"
              className="text-[3.5rem]"
              fontSize="inherit"
            />
          </IconButton>
        </Box>
      )}

      <Button
        className="mb-6 w-fit mx-auto"
        color={preview ? 'success' : 'primary'}
        component="label"
        disabled={isDisabled}
        role={undefined}
        startIcon={<CloudUploadIcon />}
        tabIndex={-1}
        variant="contained"
      >
        {preview && 'Neues '}Bild hochladen
        <input
          ref={imgRef}
          id="image"
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
        />
      </Button>
    </>
  )
}

export default UploadButton
