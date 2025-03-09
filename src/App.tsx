import './App.css'
import './fire'
import {Route, Routes} from 'react-router'

import LoginPage from './pages/LoginPage'
import useFirebaseAuth from './hooks/auth-state/use-firebase-auth'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import CollectionPage from './pages/CollectionPage'
import AddPage from './pages/AddPage'
import DetailPage from './pages/DetailPage'
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
            <Route index element={<ListPage collection="catania" />} />
            <Route
              path=":color"
              element={<DetailPage collection="catania" />}
            />
          </Route>

          <Route path="catania-color" element={<CollectionPage />}>
            <Route index element={<ListPage collection="catania-color" />} />
            <Route
              path=":color"
              element={<DetailPage collection="catania-color" />}
            />
          </Route>

          <Route path="cotton-quick" element={<CollectionPage />}>
            <Route index element={<ListPage collection="cotton-quick" />} />
            <Route
              path=":color"
              element={<DetailPage collection="cotton-quick" />}
            />
          </Route>

          <Route path="cotton-quick-print" element={<CollectionPage />}>
            <Route
              index
              element={<ListPage collection="cotton-quick-print" />}
            />
            <Route
              path=":color"
              element={<DetailPage collection="cotton-quick-print" />}
            />
          </Route>

          <Route path="funny-uni" element={<CollectionPage />}>
            <Route index element={<ListPage collection="funny-uni" />} />
            <Route
              path=":color"
              element={<DetailPage collection="funny-uni" />}
            />
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
