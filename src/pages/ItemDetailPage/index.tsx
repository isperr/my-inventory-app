import {useEffect, useRef} from 'react'
import {useParams} from 'react-router'

import FloatingButton from '../../atoms/FloatingButton'
import PageTemplate from '../../templates/Page'

import {useResolveItem} from './hooks/use-resolve-item'
import Content from './components/Content'

const ItemDetailPage = () => {
  const effectRan = useRef<boolean>(false)
  const params = useParams()
  const id = params?.item

  const {isResolved, handleResolveData} = useResolveItem(id)

  useEffect(() => {
    if (!effectRan.current && !isResolved) {
      handleResolveData()
    }

    return () => {
      effectRan.current = true
    }
  }, [isResolved, id])

  return (
    <PageTemplate className="h-fit gap-2">
      <Content id={id} />

      <FloatingButton position="secondary" icon="back" path="/finished-items">
        Zur Liste
      </FloatingButton>
      <FloatingButton />
    </PageTemplate>
  )
}

export default ItemDetailPage
