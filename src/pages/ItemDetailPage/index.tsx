import {useEffect, useRef} from 'react'
import {useParams} from 'react-router'

import FloatingButton from '../../atoms/FloatingButton'
import {useScrollToTop} from '../../hooks/use-scroll-to-top'
import PageTemplate from '../../templates/Page'

import {useResolveItem} from './hooks/use-resolve-item'
import {useToggleEditMode} from './hooks/use-toggle-edit-mode'
import Content from './components/Content'

const ItemDetailPage = () => {
  useScrollToTop()
  const effectRan = useRef<boolean>(false)
  const params = useParams()
  const id = params?.item

  const {isResolved, handleResolveData} = useResolveItem(id)
  const {isEditMode} = useToggleEditMode()

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

      {!isEditMode && (
        <>
          <FloatingButton
            position="secondary"
            icon="back"
            path="/finished-items"
          >
            Zur Liste
          </FloatingButton>
          <FloatingButton />
        </>
      )}
    </PageTemplate>
  )
}

export default ItemDetailPage
