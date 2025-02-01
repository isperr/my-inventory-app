import {useCallback, useEffect, useState} from 'react'
import './App.css'
import './fire'
import {
  collection,
  getDocs,
  getFirestore,
  DocumentData
} from 'firebase/firestore'
import {Route, Routes} from 'react-router'

import {useAppDispatch} from './utils/store-hooks'
import LoginPage from './pages/LoginPage'
import useFirebaseAuth from './hooks/auth-state/use-firebase-auth'
import {setGenres} from './modules/auth/slice'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import CollectionPage from './pages/CollectionPage'
import AddPage from './pages/AddPage'
import ColorPage from './pages/ColorPage'
import SearchPage from './pages/SearchPage'
import ListPage from './pages/ListPage'

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
    <Routes>
      {isLoggedIn && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="catania" element={<CollectionPage />}>
            <Route index element={<ListPage />} />
            <Route path=":color" element={<ColorPage />} />
          </Route>
          <Route path="scan" element={<ScanPage />}>
            <Route index element={<SearchPage />} />
            <Route path="add" element={<AddPage />} />
          </Route>
        </>
      )}
      {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
    </Routes>
  )
}

export default App
