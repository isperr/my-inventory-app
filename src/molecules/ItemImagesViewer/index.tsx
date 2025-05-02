import {PhotoSlider} from 'react-photo-view'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import {useState} from 'react'

const ItemImagesViewer = ({imgUrls}: {imgUrls: Array<string>}) => {
  const [index, setIndex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <ImageList className="px-6" cols={3} rowHeight={120} variant="quilted">
        {imgUrls.map((imgUrl, idx) => (
          <ImageListItem
            className="cursor-pointer"
            key={`img-${idx}`}
            onClick={() => {
              setIndex(idx)
              setVisible(true)
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                setIndex(idx)
                setVisible(true)
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
        ))}
      </ImageList>
      <PhotoSlider
        images={imgUrls.map(imgUrl => ({src: imgUrl, key: imgUrl}))}
        visible={visible}
        onClose={() => {
          setVisible(false)
          setIndex(0)
        }}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  )
}

export default ItemImagesViewer
