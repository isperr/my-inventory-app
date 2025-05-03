import {memo, useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {Box, Typography} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'

import Button from '../../../atoms/Button'
import DetailText from '../../../atoms/DetailText'
import {categoryNames, ItemDocumentData} from '../../../modules/types'
import ItemImagesViewer from '../../../molecules/ItemImagesViewer'

import DeleteDialog from './DeleteDialog'

type NonEditViewProps = ItemDocumentData & {
  enterEditMode: () => void
}

const NonEditView = ({
  enterEditMode,
  name,
  id,
  imgUrl,
  images,
  price,
  count,
  details,
  category
}: NonEditViewProps) => {
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false)

  return (
    <>
      <Typography className="px-4 text-center" variant="h4">
        {name}
      </Typography>
      {imgUrl ? (
        <img
          className="max-h-[180px] min-h-[150px] min-w-[250px] max-w-[300px] m-auto object-contain cursor-pointer"
          alt={name}
          src={imgUrl}
          onClick={() => {
            setIsSliderOpen(true)
          }}
        />
      ) : (
        <Box
          className={twMerge(
            'h-[180px] w-[250px] mx-auto my-3.5 text-[4rem]',
            'bg-[#bdbdbd] flex justify-center items-center text-[#f4f3f2]'
          )}
        >
          <ImageIcon color="inherit" fontSize="inherit" />
        </Box>
      )}
      <Box className="mx-6">
        <div className="grid grid-cols-10">
          <DetailText
            heading="Kategorie:"
            text={categoryNames[category]}
            type="item"
          />
          <DetailText heading="Anzahl:" text={count.toString()} type="item" />
          <DetailText
            heading="Preis:"
            text={new Intl.NumberFormat(navigator.languages?.[0] ?? 'de-DE', {
              style: 'currency',
              currency: 'EUR'
            }).format(price)}
            type="item"
          />
          <DetailText heading="Details:" text={details || '--'} type="item" />
        </div>
      </Box>

      <Button className="mx-6" onClick={enterEditMode} startIcon={<EditIcon />}>
        Bearbeiten
      </Button>
      <DeleteDialog
        hasPreview={Boolean(imgUrl)}
        id={id}
        images={images}
        name={name}
      />

      <ItemImagesViewer
        images={images}
        isSliderOpen={isSliderOpen}
        preview={imgUrl}
        setIsSliderOpen={setIsSliderOpen}
      />
    </>
  )
}

export default memo(NonEditView)
