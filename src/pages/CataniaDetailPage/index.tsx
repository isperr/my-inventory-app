import {useCallback, useEffect, useRef} from 'react'
import {useParams} from 'react-router'

import FloatingButton from '../../atoms/FloatingButton'
import WoolDetailContent from '../../molecules/WoolDetailContent'
import WoolDetail from '../../molecules/WoolDetail'
import PageTemplate from '../../templates/Page'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

import {onResolveData} from './hooks/use-resolve'
import {useUpdate} from './hooks/use-update'
import {useToasts} from './hooks/use-toats'
import {CollectionType} from '../HomePage/types'
import {getResolveActions, getResolveSelectors} from './utils/get-slice'

const CataniaDetailPage = ({collection}: {collection: CollectionType}) => {
  const dispatch = useAppDispatch()
  const {resolveErrorToast} = useToasts()

  const effectRan = useRef<boolean>(false)
  const params = useParams()
  const id = params?.color

  const {isUpdatingAdd, isUpdatingRemove, onUpdateCount, onConfirmActivate} =
    useUpdate(collection, id)

  const {
    selectHasResolveError,
    selectIsIdResolved,
    selectIsIdResolving,
    selectResolveData
  } = getResolveSelectors(collection)
  const item = useAppSelector(selectResolveData(id))
  const isResolved = useAppSelector(selectIsIdResolved(id))
  const isResolving = useAppSelector(selectIsIdResolving(id))
  const hasResolveError = useAppSelector(selectHasResolveError(id))

  const {resolve, resolved, resolvingError} = getResolveActions(collection)

  const handleResolveData = useCallback(async () => {
    if (!params?.color) {
      return
    }
    try {
      dispatch(resolve(params.color))
      const data = await onResolveData(params.color, collection)
      dispatch(resolved({data, id: params.color}))
    } catch (error) {
      dispatch(resolvingError({error: error as Error, id: params.color}))
      resolveErrorToast()
    }
  }, [collection])

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

export default CataniaDetailPage
