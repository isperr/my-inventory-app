import {useCallback, useEffect, useState} from 'react'
import './App.css'
import './fire'
import {
  collection,
  getDocs,
  getFirestore,
  DocumentData
} from 'firebase/firestore'
import {ToastContainer} from 'react-toastify'
import {useAppDispatch} from './utils/store-hooks'
import LoginPage from './pages/LoginPage'
import useFirebaseAuth from './hooks/auth-state/use-firebase-auth'
import {setGenres} from './modules/auth/slice'
import HomePage from './pages/HomePage'

export type GenreCollectionType = {
  [key: string]: DocumentData
}

const App = () => {
  const {isLoggedIn, genres} = useFirebaseAuth()
  const dispatch = useAppDispatch()

  const db = getFirestore()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // @ts-ignore: will be used later
  const onLoadGenres = useCallback(async () => {
    const temp: DocumentData[] = []
    const collectionRef = collection(db, 'genres')
    const snapshot = await getDocs(collectionRef)
    snapshot.forEach(doc => {
      temp.push(doc.data())
    })
    // dispatch(actions.genresLoaded({genres}))
    console.log('it worked', temp)
    dispatch(setGenres(temp))
  }, [db, genres])

  useEffect(() => {
    if (isLoggedIn && !isLoaded) {
      console.log('we loading')
      setIsLoaded(true)
      onLoadGenres()
    }
  }, [isLoggedIn, isLoaded])

  return (
    <>
      <ToastContainer className="pl-[5%]" stacked position="bottom-center" />

      {isLoggedIn && <HomePage />}
      {!isLoggedIn && <LoginPage />}
    </>
  )
}

export default App
