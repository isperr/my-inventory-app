import {Outlet} from 'react-router'
import PageTemplate from '../../templates/Page'

const CollectionPage = () => {
  return (
    <PageTemplate className="m-0 justify-start">
      <h5>collection page</h5>
      <Outlet />
    </PageTemplate>
  )
}

export default CollectionPage
