import {useEffect, useRef} from 'react'
import Typography from '@mui/material/Typography'
import {FormControlLabel, Switch} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'

import PageTemplate from '../../templates/Page'

import {collectionNames, CollectionType} from '../HomePage/types'
import {useLoadData} from './hooks/use-load-data'
import WoolList from '../../molecules/WoolList'
import {WoolListItemType} from '../../molecules/WoolList/components/WoolListItem'

const ListPage = ({collection}: {collection: CollectionType}) => {
  const effectRan = useRef<boolean>(false)

  const {
    data,
    error,
    isActivated,
    isLoaded,
    isLoading,
    handleActivatedChange,
    handleLoadData
  } = useLoadData(collection)

  useEffect(() => {
    if (!effectRan.current && !isLoaded) {
      handleLoadData(isActivated)
    }

    return () => {
      effectRan.current = true
    }
  }, [isLoaded])

  return (
    <PageTemplate className="h-fit gap-2">
      <Typography className="px-4 text-center" variant="h4">
        {collectionNames[collection]}
      </Typography>
      <FormControlLabel
        className="px-4"
        control={
          <Switch
            checked={isActivated}
            onChange={handleActivatedChange}
            inputProps={{'aria-label': 'controlled'}}
          />
        }
        label={
          isActivated ? (
            <>in der Sammlung</>
          ) : (
            <>
              noch <b>nicht</b> in der Sammlung
            </>
          )
        }
        value={isActivated}
      />

      <WoolList
        data={data as WoolListItemType[]}
        error={error}
        isLoading={isLoading}
        link={`/${collection}`}
      />

      <FloatingButton />
    </PageTemplate>
  )
}

export default ListPage
