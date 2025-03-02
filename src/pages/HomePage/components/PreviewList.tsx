import {memo, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router'

import Button from '../../../atoms/Button'
import WoolListPreview from '../../../molecules/WoolListPreview'
import {WoolListItemType} from '../../../molecules/WoolList/components/WoolListItem'

import {useLoadCataniaData} from '../hooks/use-load-catania-data'
import {CollectionType} from '../types'

const PreviewList = ({collection}: {collection: CollectionType}) => {
  const navigate = useNavigate()

  const effectRan = useRef<boolean>(false)

  const {data, error, isLoaded, isLoading, handleLoadData} =
    useLoadCataniaData(collection)

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
    <div className="px-4">
      <WoolListPreview
        collection={collection}
        data={data as WoolListItemType[]}
        hasError={Boolean(error)}
        isLoading={isLoading}
      />
      <div className="w-auto flex px-4">
        <Button fullWidth onClick={handleNavigate} size="small">
          Gesamte Liste anzeigen
        </Button>
      </div>
    </div>
  )
}

export default memo(PreviewList)
