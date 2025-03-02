import {useEffect, useRef} from 'react'
import Typography from '@mui/material/Typography'
import {FormControlLabel, Switch} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'

import PageTemplate from '../../templates/Page'

import {collectionNames, CollectionType} from '../HomePage/types'
import List from './components/List'
import {useLoadData} from './hooks/use-load-data'

const CataniaListPage = ({collection}: {collection: CollectionType}) => {
  const effectRan = useRef<boolean>(false)

  const {isActivated, isLoaded, handleActivatedChange, handleLoadData} =
    useLoadData(collection)

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
        label={isActivated ? 'in der Sammlung' : 'noch nicht in der Sammlung'}
        value={isActivated}
      />
      <List collection={collection} />
      <FloatingButton />
    </PageTemplate>
  )
}

export default CataniaListPage
