import {CircularProgress, Link} from '@mui/material'

import Logo from '../../../atoms/Logo'
import PageText from '../../../atoms/PageText'
import {useResolveItem} from '../hooks/use-resolve-item'

import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import EditView from './EditView'
import NonEditView from './NonEditView'

const Content = ({id}: {id?: string}) => {
  const {hasResolveError, isResolved, isResolving, item} = useResolveItem(id)
  const {enterEditMode, isEditMode} = useToggleEditMode()

  if (hasResolveError) {
    return (
      <>
        <Logo />
        <PageText>
          Das fertige Werk mit der "{id}" konnte nicht geladen werden. Versuche
          die Seite neu zu Laden oder navigiere{' '}
          <Link color="secondary" href={'/finished-items'}>
            zurück
          </Link>{' '}
          zur Liste.
        </PageText>
      </>
    )
  }

  if (isResolving) {
    return (
      <div className="w-full flex justify-center items-center h-[90vh]">
        <CircularProgress />
      </div>
    )
  }

  if (isResolved && !item) {
    return (
      <PageText>
        Ein fertiges Werk mit der "{id}" konnte nicht gefunden werden.
      </PageText>
    )
  }

  if (item && !isEditMode) {
    return <NonEditView enterEditMode={enterEditMode} {...item} />
  }

  if (isEditMode) {
    return <EditView id={id} />
  }

  return null
}

export default Content
