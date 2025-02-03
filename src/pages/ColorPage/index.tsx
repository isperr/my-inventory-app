import {useCallback, useEffect, useRef} from 'react'
import {useParams} from 'react-router'

import FloatingButton from '../../atoms/FloatingButton'
import {
  resolve,
  resolved,
  resolvingError,
  selectIsIdResolved
} from '../../modules/catania/slice'
import PageTemplate from '../../templates/Page'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

import {onResolveData} from './hooks/use-resolve'
import Content from './components/Content'

const ColorPage = () => {
  const dispatch = useAppDispatch()
  const effectRan = useRef<boolean>(false)

  const params = useParams()
  const isResolved = useAppSelector(selectIsIdResolved(params?.color))

  const handleResolveData = useCallback(async () => {
    if (!params?.color) {
      return
    }
    try {
      dispatch(resolve(params.color))
      const data = await onResolveData(params.color)
      dispatch(resolved({data, id: params.color}))
    } catch (error) {
      dispatch(resolvingError({error: error as Error, id: params.color}))
    }
  }, [])

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
      <Content id={params?.color} />
      <FloatingButton position="secondary" icon="back" path="/catania" />
      <FloatingButton />
    </PageTemplate>
  )
}

export default ColorPage
