import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  setValidUser
} from '../../modules/auth/slice'
import {doc, getDoc, getFirestore} from 'firebase/firestore'
import {useCallback} from 'react'
import {useNotifications} from '@toolpad/core/useNotifications'
import {getToastConfig} from '../../utils/toast/get-toast-config'

// const res = {
//   data: 'auth',
//   isLoading: true,
//   isLoaded: false,
//   isError: false,
//   onCheckUser: 'func',
//   onLogin: 'func',
//   onLogout: 'func'
// }

const useFirebaseAuth = () => {
  const notifications = useNotifications()
  const auth = getAuth()
  const db = getFirestore()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const username = useAppSelector(state => state.auth.username)

  const onLogin = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    try {
      dispatch(login())
      await signInWithEmailAndPassword(auth, email, password)
      dispatch(loginSuccess())
      notifications.show(
        'Du hast dich erfolgreich eingeloggt.',
        getToastConfig({severity: 'success'})
      )
    } catch (error) {
      dispatch(loginFailure())
      notifications.show(
        'Email und Passwort stimmen leider nicht überein.',
        getToastConfig({})
      )
    }
  }

  const onLogout = async () => {
    try {
      dispatch(logout())
      await signOut(auth)
      dispatch(logoutSuccess())
      notifications.show(
        'Du hast dich erfolgreich ausgeloggt.',
        getToastConfig({severity: 'success'})
      )
    } catch (error) {
      dispatch(logoutFailure())
      notifications.show(
        'Beim Logout ist leider etwas schiefgelaufen.',
        getToastConfig({})
      )
    }
  }

  const onCheckUser = useCallback(async () => {
    await onAuthStateChanged(auth, async user => {
      if (user?.email) {
        const docRef = doc(db, 'users', user.email)
        const docSnap = await getDoc(docRef)
        const userDoc = docSnap.data()

        dispatch(setValidUser(userDoc?.username ?? null))
      }
    })
  }, [])

  return {
    auth,
    isLoading,
    isLoggedIn,
    onCheckUser,
    onLogin,
    onLogout,
    username
  }
}

export default useFirebaseAuth
