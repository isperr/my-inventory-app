import {Link} from 'react-router'
import PageTemplate from '../../templates/Page'

const ListPage = () => {
  return (
    <PageTemplate className="h-fit">
      LIST page
      <Link to="/">home</Link>
      <Link to="/catania/157">157 color test</Link>
    </PageTemplate>
  )
}

export default ListPage
