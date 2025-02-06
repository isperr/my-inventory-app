import {useCallback, useEffect, useRef} from 'react'
import {useParams} from 'react-router'
import {useNotifications} from '@toolpad/core/useNotifications'

import FloatingButton from '../../atoms/FloatingButton'
import {
  resolve,
  resolved,
  resolvingError
} from '../../modules/catania/results/slice'
import {selectIsIdResolved} from '../../modules/catania/results/selectors'
import PageTemplate from '../../templates/Page'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

import {onResolveData} from './hooks/use-resolve'
import Content from './components/Content'
import {getToastConfig} from '../../utils/toast/get-toast-config'

const ColorPage = () => {
  const notifications = useNotifications()

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
      notifications.show(
        'Beim Laden der Wollknäuel-Daten ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
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
