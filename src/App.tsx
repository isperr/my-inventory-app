import './App.css'
import './fire'
import {Route, Routes} from 'react-router'

import LoginPage from './pages/LoginPage'
import useFirebaseAuth from './hooks/auth-state/use-firebase-auth'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import CollectionPage from './pages/CollectionPage'
import AddPage from './pages/AddPage'
import ColorPage from './pages/ColorPage'
import SearchPage from './pages/SearchPage'
import ListPage from './pages/ListPage'

const App = () => {
  const {isLoggedIn} = useFirebaseAuth()

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
