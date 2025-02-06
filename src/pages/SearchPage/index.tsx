import {Link} from 'react-router'
import PageTemplate from '../../templates/Page'
import FloatingButton from '../../atoms/FloatingButton'

const SearchPage = () => {
  return (
    <PageTemplate className="h-fit">
      search page
      <Link to="/">home</Link>
      <Link to="/scan/add">add</Link>
      <FloatingButton />
    </PageTemplate>
  )
}

export default SearchPage
