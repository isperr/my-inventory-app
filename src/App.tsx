import {useCallback, useEffect, useMemo, useState} from 'react'
import './App.css'
import './fire'
import {
  collection,
  getDocs,
  getFirestore,
  DocumentData
} from 'firebase/firestore'
import {ToastContainer} from 'react-toastify'
import {increment, decrement} from './modules/toast/slice'
import {useAppDispatch, useAppSelector} from './utils/store-hooks'

export type GenreCollectionType = {
  [key: string]: DocumentData
}

const App = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  const db = getFirestore()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const genres: GenreCollectionType = useMemo(() => ({}), [])

  // @ts-ignore: will be used later
  const onLoadGenres = useCallback(async () => {
    const collectionRef = collection(db, 'genres')
    const snapshot = await getDocs(collectionRef)
    snapshot.forEach(doc => {
      genres[doc.id] = {...doc.data()}
    })
    // dispatch(actions.genresLoaded({genres}))
    console.log('it worked', genres)
  }, [db, genres])

  useEffect(() => {
    if (!isLoaded) {
      console.log('we loading')
      setIsLoaded(true)
      // onLoadGenres()
    }
  }, [isLoaded])

  return (
    <>
      <ToastContainer className="pl-[5%]" stacked position="bottom-center" />

      <div className="card">
        count is {count}
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
      </div>
    </>
  )
}

export default App
