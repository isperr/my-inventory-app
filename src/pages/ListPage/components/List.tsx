import WoolList from '../../../molecules/WoolList'
import {WoolListItemType} from '../../../molecules/WoolList/components/WoolListItem'
import {useAppSelector} from '../../../utils/store-hooks'
import {CollectionType} from '../../HomePage/types'

import {getSelectors} from '../utils/get-slice'

const List = ({collection}: {collection: CollectionType}) => {
  const {selectData, selectError, selectIsLoading} = getSelectors(collection)
  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoading = useAppSelector(selectIsLoading)

  return (
    <WoolList
      data={data as WoolListItemType[]}
      error={error}
      isLoading={isLoading}
      link={`/${collection}`}
    />
  )
}

export default List
