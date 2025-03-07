import {memo, useEffect, useRef} from 'react'
import {useParams} from 'react-router'

import FloatingButton from '../../atoms/FloatingButton'
import WoolDetailContent from '../../molecules/WoolDetailContent'
import WoolDetail from '../../molecules/WoolDetail'
import PageTemplate from '../../templates/Page'

import {CollectionType} from '../HomePage/types'
import {useUpdate} from './hooks/use-update'
import {useResolveData} from './hooks/use-resolve-data'

const DetailPage = ({collection}: {collection: CollectionType}) => {
  const effectRan = useRef<boolean>(false)
  const params = useParams()
  const id = params?.color

  const {isUpdatingAdd, isUpdatingRemove, onUpdateCount, onConfirmActivate} =
    useUpdate(collection, id)

  const {hasResolveError, item, isResolved, isResolving, handleResolveData} =
    useResolveData(collection, id)

  useEffect(() => {
    if (!effectRan.current && !isResolved) {
      handleResolveData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isResolved, params?.color])

  return (
    <PageTemplate className="h-fit my-10 gap-12">
      <WoolDetailContent
        collection={collection}
        hasResolveError={hasResolveError}
        id={id}
        isResolved={isResolved}
        isResolving={isResolving}
      >
        {item && (
          <WoolDetail
            color={item.color}
            count={item.count}
            imgUrl={item.imgUrl}
            isActivated={item.isActivated}
            isbn={item.ISBN}
            name={item.name}
            collection={collection}
            isAddDisabled={isUpdatingAdd || isUpdatingRemove}
            isAdding={isUpdatingAdd}
            isSubtractDisabled={isUpdatingAdd || isUpdatingRemove}
            isSubtracting={isUpdatingRemove}
            onConfirmActivate={onConfirmActivate}
            onUpdateCount={onUpdateCount}
          />
        )}
      </WoolDetailContent>

      <FloatingButton position="secondary" icon="back" path={`/${collection}`}>
        Zur Liste
      </FloatingButton>
      <FloatingButton />
    </PageTemplate>
  )
}

export default memo(DetailPage)
