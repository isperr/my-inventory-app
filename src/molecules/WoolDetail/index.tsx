import {memo} from 'react'
import {twMerge} from 'tailwind-merge'
import {Box} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'

import ActivateDialog from './components/ActivateDialog'
import ColorText from './components/ColorText'
import CountButton from './components/CountButton'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'

export type WoolDetailType = {
  color: number
  count: number
  imgUrl?: string | null
  isActivated: boolean
  isbn: number
  name: string
}

export type WoolDetailProps = WoolDetailType & {
  collection: CollectionType
  isAddDisabled: boolean
  isAdding: boolean
  isSubtractDisabled: boolean
  isSubtracting: boolean
  onConfirmChangeIsActivated: (
    isActivated: boolean,
    closeDialog: () => void
  ) => void
  onUpdateCount: (updatedCount: number, type: 'add' | 'remove') => void
}

const WoolDetail = ({
  collection,
  isAddDisabled,
  isAdding,
  isSubtractDisabled,
  isSubtracting,
  onConfirmChangeIsActivated,
  onUpdateCount,
  ...item
}: WoolDetailProps) => {
  const {color, count, imgUrl, isActivated, isbn, name} = item

  return (
    <>
      <ActivateDialog
        isActivated={isActivated}
        onConfirm={onConfirmChangeIsActivated}
      />

      {imgUrl ? (
        <img
          className="max-h-[180px] min-h-[150px] min-w-[250px] max-w-[300px] m-auto rounded-full"
          alt={name}
          src={imgUrl}
        />
      ) : (
        <Box
          className={twMerge(
            'max-h-[180px] min-h-[120px] min-w-[250px] max-w-[300px] mx-auto my-3.5 text-[4rem]',
            'rounded-full bg-[#bdbdbd] flex justify-center items-center text-[#f4f3f2]'
          )}
        >
          <ImageIcon color="inherit" fontSize="inherit" />
        </Box>
      )}
      <Box className="mx-6">
        <ColorText heading={`${collectionNames[collection]} Daten:`} />
        <div className="grid grid-cols-4 grid-rows-3">
          <ColorText heading="ISBN:" text={isbn.toString()} />
          <ColorText heading="Farbe:" text={color.toString()} />
          <ColorText heading="Name:" text={name} />
        </div>
      </Box>
      <Box className="mx-6 flex flex-col gap-8">
        <Box>
          <ColorText heading="Wollknäuel Bestand:" />
          <div className="grid grid-cols-4 grid-rows-1">
            <ColorText heading="Anzahl:" text={count.toString()} />
          </div>
        </Box>
        <Box className="flex justify-around">
          <CountButton
            ariaLabel="add"
            count={count}
            isDisabled={isAddDisabled}
            isLoading={isAdding}
            onClick={onUpdateCount}
            type="add"
          />

          <CountButton
            ariaLabel="remove"
            count={count}
            isDisabled={count === 0 || isSubtractDisabled}
            isLoading={isSubtracting}
            onClick={onUpdateCount}
            type="remove"
          />
        </Box>
      </Box>
    </>
  )
}

export default memo(WoolDetail)
