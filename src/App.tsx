import './App.css'
import './fire'
import {Route, Routes} from 'react-router'

import {collectionNames, CollectionType} from './pages/HomePage/types'
import AddPage from './pages/AddPage'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import ItemDetailPage from './pages/ItemDetailPage'
import ItemAddPage from './pages/ItemAddPage'
import ItemListPage from './pages/ItemListPage'
import ListPage from './pages/ListPage'
import LoginPage from './pages/LoginPage'
import PageHuskTemplate from './templates/PageHusk'
import SearchPage from './pages/SearchPage'
import useFirebaseAuth from './hooks/auth-state/use-firebase-auth'
import {collectionNames, CollectionType} from './pages/HomePage/types'

const App = () => {
  const {isLoggedIn} = useFirebaseAuth()

  return (
    <Routes>
      {isLoggedIn && (
        <>
          <Route path="/" element={<HomePage />} />

          {Object.keys(collectionNames).map(key => {
            const collection = key as CollectionType
            return (
              <Route key={key} path={key} element={<PageHuskTemplate />}>
                <Route index element={<ListPage collection={collection} />} />
                <Route
                  path=":color"
                  element={<DetailPage collection={collection} />}
                />
              </Route>
            )
          })}

          <Route path="scan" element={<PageHuskTemplate />}>
            <Route index element={<SearchPage />} />
            <Route path="add" element={<AddPage />} />
          </Route>

          <Route path="finished-items" element={<PageHuskTemplate />}>
            <Route index element={<ItemListPage />} />
            <Route path="add" element={<ItemAddPage />} />
            <Route path=":item" element={<ItemDetailPage />} />
          </Route>

          <Route path="*" element={<HomePage />} />
        </>
      )}
      {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
    </Routes>
  )
}

export default App
