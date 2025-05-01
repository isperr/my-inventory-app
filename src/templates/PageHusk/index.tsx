import {Outlet} from 'react-router'
import PageTemplate from '../../templates/Page'

const PageHuskTemplate = () => (
  <PageTemplate className="m-0 justify-start">
    <Outlet />
  </PageTemplate>
)

export default PageHuskTemplate
