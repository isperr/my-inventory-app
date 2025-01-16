import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../utils/store'
import {toast} from 'react-toastify'
import {DocumentData} from 'firebase/firestore'

// Define a type for the slice state
interface AuthState {
  isLoading: boolean
  isLoggedIn: boolean
  genres: DocumentData[]
}

// Define the initial state using that type
const initialState: AuthState = {
  genres: [],
  isLoading: false,
  isLoggedIn: false
}

export const authState = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: state => {
      state.isLoading = true
    },
    loginSuccess: state => {
      state.isLoading = false
      state.isLoggedIn = true
      toast.success('Du hast dich erfolgreich eingeloggt.')
    },
    loginFailure: state => {
      state.isLoading = false
      state.isLoggedIn = false
      toast.error('Email und Passwort stimmen leider nicht überein.')
    },
    logout: state => {
      state.isLoggedIn = false
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    checkUser: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setGenres: (state, action: PayloadAction<DocumentData[]>) => {
      state.genres = action.payload
    }
  }
})

export const {
  login,
  loginFailure,
  loginSuccess,
  logout,
  incrementByAmount,
  setGenres
} = authState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default authState.reducer
