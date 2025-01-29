import {Outlet} from 'react-router'
import PageTemplate from '../../templates/Page'

const ScanPage = () => {
  return (
    <PageTemplate className="m-0 justify-start">
      <h5>scan page</h5>
      <Outlet />
    </PageTemplate>
  )
}

export default ScanPage
