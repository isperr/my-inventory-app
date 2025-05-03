import {PhotoSlider} from 'react-photo-view'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import {useMemo, useState} from 'react'
import {ExtraImageType} from '../../modules/types'

const ItemImagesViewer = ({
  images,
  isSliderOpen,
  preview,
  setIsSliderOpen
}: {
  images: Array<ExtraImageType>
  isSliderOpen: boolean
  preview?: string
  setIsSliderOpen: (isSliderOpen: boolean) => void
}) => {
  const [index, setIndex] = useState<number>(0)

  const imgUrls = useMemo(() => {
    const temp: Array<{showInList: boolean; imgUrl: string}> = images.map(
      ({imgUrl}) => ({imgUrl, showInList: true})
    )

    if (preview) {
      temp.unshift({showInList: false, imgUrl: preview})
    }

    return temp
  }, [preview, images])

  return (
    <>
      <ImageList className="px-6" cols={3} rowHeight={120} variant="quilted">
        {imgUrls.map(({imgUrl, showInList}, idx) => {
          if (showInList) {
            return (
              <ImageListItem
                className="cursor-pointer"
                key={`img-${idx}`}
                onClick={() => {
                  setIndex(idx)
                  setIsSliderOpen(true)
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    setIndex(idx)
                    setIsSliderOpen(true)
                  }
                }}
                tabIndex={0}
              >
                <img
                  srcSet={imgUrl}
                  src={imgUrl}
                  alt={`img-${idx}`}
                  loading="lazy"
                />
              </ImageListItem>
            )
          }
          return null
        })}
      </ImageList>
      <PhotoSlider
        images={imgUrls.map(({imgUrl}) => ({src: imgUrl, key: imgUrl}))}
        visible={isSliderOpen}
        onClose={() => {
          setIsSliderOpen(false)
          setIndex(0)
        }}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  )
}

export default ItemImagesViewer
