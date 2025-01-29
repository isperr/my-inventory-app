import {Link, useParams} from 'react-router'
import PageTemplate from '../../templates/Page'

const ColorPage = () => {
  const params = useParams()
  console.log(params.color)
  return (
    <PageTemplate className="h-fit">
      color page: {params.color}
      <Link to="/">home</Link>
      <Link to="/catania">back</Link>
    </PageTemplate>
  )
}

export default ColorPage
