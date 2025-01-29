import {Link} from 'react-router'
import PageTemplate from '../../templates/Page'

const SearchPage = () => {
  return (
    <PageTemplate className="h-fit">
      search page
      <Link to="/">home</Link>
      <Link to="/scan/add">add</Link>
    </PageTemplate>
  )
}

export default SearchPage
