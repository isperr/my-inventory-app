import {memo} from 'react'
import {twMerge} from 'tailwind-merge'
import {Box} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'

import ActivateDialog from './components/ActivateDialog'
import CountButton from './components/CountButton'
import {collectionNames, CollectionType} from '../../pages/HomePage/types'
import DetailText from '../../atoms/DetailText'

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
        <DetailText
          heading={`${collectionNames[collection]} Daten:`}
          type="wool"
        />
        <div className="grid grid-cols-9 grid-rows-3">
          <DetailText heading="ISBN:" text={isbn.toString()} type="wool" />
          <DetailText heading="Farbe:" text={color.toString()} type="wool" />
          <DetailText heading="Name:" text={name} type="wool" />
        </div>
      </Box>
      <Box className="mx-6 flex flex-col gap-8">
        <Box>
          <DetailText heading="Wollknäuel Bestand:" type="wool" />
          <div className="grid grid-cols-9 grid-rows-1">
            <DetailText heading="Anzahl:" text={count.toString()} type="wool" />
          </div>
        </Box>
        <Box className="flex justify-around">
          <CountButton
            ariaLabel="remove"
            count={count}
            isDisabled={count === 0 || isSubtractDisabled}
            isLoading={isSubtracting}
            onClick={onUpdateCount}
            type="remove"
          />

          <CountButton
            ariaLabel="add"
            count={count}
            isDisabled={isAddDisabled}
            isLoading={isAdding}
            onClick={onUpdateCount}
            type="add"
          />
        </Box>
      </Box>
    </>
  )
}

export default memo(WoolDetail)
