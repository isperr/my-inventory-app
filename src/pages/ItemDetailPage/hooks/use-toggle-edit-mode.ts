import {useCallback} from 'react'

import {selectIsEditMode} from '../../../modules/finished-items/results/selectors'
import {toggleEditMode} from '../../../modules/finished-items/results/slice'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

export const useToggleEditMode = () => {
  const dispatch = useAppDispatch()
  const isEditMode = useAppSelector(selectIsEditMode)

  const handleToggle = (isEditMode: boolean) => {
    dispatch(toggleEditMode(isEditMode))
  }

  const enterEditMode = useCallback(() => {
    handleToggle(true)
  }, [handleToggle])

  const leaveEditMode = useCallback(() => {
    handleToggle(false)
  }, [handleToggle])

  return {
    enterEditMode,
    leaveEditMode,
    isEditMode
  }
}
