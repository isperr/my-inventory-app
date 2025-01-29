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
  const auth = getAuth()
  const db = getFirestore()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const genres = useAppSelector(state => state.auth.genres)
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
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  const onLogout = async () => {
    try {
      dispatch(logout())
      await signOut(auth)
      dispatch(logoutSuccess())
    } catch (error) {
      dispatch(logoutFailure())
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
    genres,
    isLoading,
    isLoggedIn,
    onCheckUser,
    onLogin,
    onLogout,
    username
  }
}

export default useFirebaseAuth
