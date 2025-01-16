import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {login, loginFailure, loginSuccess} from '../../modules/auth/slice'

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

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const genres = useAppSelector(state => state.auth.genres)

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

  return {
    auth,
    genres,
    isLoading,
    isLoggedIn,
    onLogin
  }
}

export default useFirebaseAuth
