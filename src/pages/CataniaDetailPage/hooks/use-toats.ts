import {useNotifications} from '@toolpad/core'
import {UpdatingType} from '../../../modules/catania/types'
import {getToastConfig} from '../../../utils/toast/get-toast-config'
import {TOAST_TEXT} from '../constants'

export const useToasts = () => {
  const notifications = useNotifications()

  const resolveErrorToast = () => {
    notifications.show(
      'Beim Laden der Wollknäuel-Daten ist leider ein Fehler aufgetreten.',
      getToastConfig({})
    )
  }

  const updateSuccessToast = (type: UpdatingType) => {
    notifications.show(
      `Ein Wollknäuel wurde erfolgreich ${TOAST_TEXT[type].success}.`,
      getToastConfig({severity: 'success'})
    )
  }
  const updateErrorToast = (type: UpdatingType) => {
    notifications.show(
      `Beim ${TOAST_TEXT[type].error} des Wollknäuel ist leider ein Fehler aufgetreten.`,
      getToastConfig({})
    )
  }

  return {
    resolveErrorToast,
    updateErrorToast,
    updateSuccessToast
  }
}
