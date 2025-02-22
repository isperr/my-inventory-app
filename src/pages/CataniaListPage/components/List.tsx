import {
  selectData,
  selectError,
  selectIsLoading
} from '../../../modules/catania/results/selectors'
import WoolList from '../../../molecules/WoolList'
import {WoolListItemType} from '../../../molecules/WoolList/components/WoolListItem'
import {useAppSelector} from '../../../utils/store-hooks'

const LINK = '/catania'

const List = () => {
  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoading = useAppSelector(selectIsLoading)

  return (
    <WoolList
      data={data as WoolListItemType[]}
      error={error}
      isLoading={isLoading}
      link={LINK}
    />
  )
}

export default List
