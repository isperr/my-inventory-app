import {Link} from 'react-router'
import PageTemplate from '../../templates/Page'

const AddPage = () => {
  return (
    <PageTemplate className="h-fit">
      ADD page
      <Link to="/">home</Link>
      <Link to="/scan">back</Link>
    </PageTemplate>
  )
}

export default AddPage
