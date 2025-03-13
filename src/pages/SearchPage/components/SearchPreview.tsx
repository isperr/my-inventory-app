import {memo} from 'react'
import {twMerge} from 'tailwind-merge'

import {CollectionType} from '../../HomePage/types'
import WoolListPreview from '../../../molecules/WoolListPreview'
import {WoolListItemType} from '../../../molecules/WoolList/components/WoolListItem'

import {useSearchDataState} from '../hooks/use-search-data'

const SearchPreview = ({collection}: {collection: CollectionType}) => {
  const {data, hasError, isLoaded} = useSearchDataState(collection)

  return (
    <WoolListPreview
      collection={collection}
      data={data as WoolListItemType[]}
      hasError={hasError}
      isLoaded={isLoaded}
      isLoading={false}
      listClassName={twMerge(
        'px-2 pb-0',
        // only show header & list when data is loaded and has items in list
        !(isLoaded && Boolean(data.length)) && 'hidden'
      )}
      showIsActivatedChip
    />
  )
}

export default memo(SearchPreview)
