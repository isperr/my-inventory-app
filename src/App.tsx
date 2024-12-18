import {useCallback, useEffect, useMemo, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './fire'
import {
  collection,
  getDocs,
  getFirestore,
  DocumentData
} from 'firebase/firestore'

export type GenreCollectionType = {
  [key: string]: DocumentData
}

function App() {
  const [count, setCount] = useState(0)
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="underline font-bold text-2xl">
        this is a test to see if tailwind works as expected
      </div>
    </>
  )
}

export default App
