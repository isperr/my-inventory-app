import {memo, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router'

import Button from '../../../atoms/Button'
import WoolListPreview from '../../../molecules/WoolListPreview'
import {WoolListItemType} from '../../../molecules/WoolList/components/WoolListItem'

import {useLoadPreviewData} from '../hooks/use-load-preview-data'
import {collectionNames, CollectionType} from '../types'

const PreviewList = ({collection}: {collection: CollectionType}) => {
  const navigate = useNavigate()

  const effectRan = useRef<boolean>(false)

  const {data, error, isLoaded, isLoading, handleLoadData} =
    useLoadPreviewData(collection)

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  const handleNavigate = () => {
    navigate(`/${collection}`)
  }

  return (
    <WoolListPreview
      button={
        <span className="pt-2 mx-2 flex">
          <Button
            className="flex-1"
            isDisabled={Boolean(error) || isLoading || !isLoaded}
            onClick={handleNavigate}
            size="small"
          >
            {collectionNames[collection]}
          </Button>
        </span>
      }
      collection={collection}
      data={data as WoolListItemType[]}
      hasError={Boolean(error)}
      isLoaded={isLoaded}
      isLoading={isLoading}
      listClassName="py-0"
    />
  )
}

export default memo(PreviewList)
