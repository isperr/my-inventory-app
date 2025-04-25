import './App.css'
import './fire'
import {Route, Routes} from 'react-router'

import LoginPage from './pages/LoginPage'
import useFirebaseAuth from './hooks/auth-state/use-firebase-auth'
import HomePage from './pages/HomePage'
import AddPage from './pages/AddPage'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'
import ListPage from './pages/ListPage'
import ItemListPage from './pages/ItemListPage'
import ItemDetailPage from './pages/ItemDetailPage'
import PageHuskTemplate from './templates/PageHusk'

const App = () => {
  const {isLoggedIn} = useFirebaseAuth()

  return (
    <Routes>
      {isLoggedIn && (
        <>
          <Route path="/" element={<HomePage />} />

          <Route path="catania" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="catania" />} />
            <Route
              path=":color"
              element={<DetailPage collection="catania" />}
            />
          </Route>

          <Route path="catania-color" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="catania-color" />} />
            <Route
              path=":color"
              element={<DetailPage collection="catania-color" />}
            />
          </Route>

          <Route path="cotton-quick" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="cotton-quick" />} />
            <Route
              path=":color"
              element={<DetailPage collection="cotton-quick" />}
            />
          </Route>

          <Route path="cotton-quick-print" element={<PageHuskTemplate />}>
            <Route
              index
              element={<ListPage collection="cotton-quick-print" />}
            />
            <Route
              path=":color"
              element={<DetailPage collection="cotton-quick-print" />}
            />
          </Route>

          <Route path="funny-uni" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="funny-uni" />} />
            <Route
              path=":color"
              element={<DetailPage collection="funny-uni" />}
            />
          </Route>

          <Route path="samt" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="samt" />} />
            <Route path=":color" element={<DetailPage collection="samt" />} />
          </Route>

          <Route path="samt-baby" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="samt-baby" />} />
            <Route
              path=":color"
              element={<DetailPage collection="samt-baby" />}
            />
          </Route>

          <Route path="dolphin-baby" element={<PageHuskTemplate />}>
            <Route index element={<ListPage collection="dolphin-baby" />} />
            <Route
              path=":color"
              element={<DetailPage collection="dolphin-baby" />}
            />
          </Route>

          <Route path="scan" element={<PageHuskTemplate />}>
            <Route index element={<SearchPage />} />
            <Route path="add" element={<AddPage />} />
          </Route>

          <Route path="finished-items" element={<ItemListPage />}>
            <Route index element={<SearchPage />} />
            <Route path="add" element={<AddPage />} />
          </Route>

          <Route path="finished-items" element={<PageHuskTemplate />}>
            <Route index element={<ItemListPage />} />
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
