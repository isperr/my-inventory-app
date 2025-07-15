import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import {Box, Typography} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import Loading from '../../atoms/ListPreview/Loading'
import NotInList from '../../atoms/ListPreview/NotInList'
import {reset, setIsbnOrColor} from '../../modules/wool/add/slice'
import PageTemplate from '../../templates/Page'
import {useAppDispatch} from '../../utils/store-hooks'

import SearchInputs from './components/SearchInputs'
import SearchPreview from './components/SearchPreview'
import {useCumulativeSearch} from './hooks/use-cumulative-search'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [tempIsbn, setTempIsbn] = useState<number | undefined>(undefined)
  const [tempColor, setTempColor] = useState<number | undefined>(undefined)

  const {
    hasNoData,
    isInAllCollections,
    isLoaded,
    isLoading,
    handleSearchAll,
    resetSearchStates
  } = useCumulativeSearch()

  useEffect(() => {
    return () => {
      if (isLoaded) {
        dispatch(reset())
        resetSearchStates()
      }
    }
  }, [isLoaded])

  const [isColorSearch, setIsColorSearch] = useState<boolean>(false)
  const handleSearchTypeChange = useCallback(() => {
    setIsColorSearch(prevState => !prevState)
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      color: {value?: string}
      isbn: {value?: string}
    }

    if (isColorSearch) {
      setTempColor(Number(formElements.color.value))
    } else {
      setTempIsbn(Number(formElements.isbn.value))
    }

    const num = isColorSearch
      ? Number(formElements.color.value)
      : Number(formElements.isbn.value)

    await handleSearchAll({isColorSearch, num})
    // set isbn or color here instead of in the useSearchData hook so it dispatches only once
    dispatch(setIsbnOrColor({data: num, isColorSearch}))
  }

  const handleAddClick = () => {
    navigate('/scan/add')
    setTempIsbn(undefined)
    setTempColor(undefined)
  }

  return (
    <PageTemplate className="h-fit gap-4 pb-12">
      <Box className="mx-6">
        <Typography className="text-center" variant="h5">
          Wollknäuel scannen
        </Typography>
      </Box>

      <SearchInputs
        handleSubmit={handleSubmit}
        handleSearchTypeChange={handleSearchTypeChange}
        isColorSearch={isColorSearch}
      />

      {(!hasNoData || isLoading) && (
        <Box className="mx-2 mt-3 flex flex-col gap-2">
          <SearchPreview collection="catania" />
          <SearchPreview collection="catania-color" />
          <SearchPreview collection="cotton-quick-print" />
          <SearchPreview collection="cotton-quick" />
          <SearchPreview collection="funny-uni" />
          <SearchPreview collection="king-cotton" />
          <SearchPreview collection="lisa-premium-uni" />
          <SearchPreview collection="samt" />
          <SearchPreview collection="samt-baby" />
          <SearchPreview collection="fluffy" />
          <SearchPreview collection="dolphin-baby" />
          <SearchPreview collection="baby-snuggle-solid" />
        </Box>
      )}

      {isLoading && <Loading />}
      {hasNoData && (
        <NotInList
          amount="none"
          color={tempColor}
          isbn={tempIsbn}
          isColorSearch={isColorSearch}
          onClick={handleAddClick}
        />
      )}
      {isLoaded && !hasNoData && !isInAllCollections && (
        <NotInList
          amount="some"
          color={tempColor}
          isbn={tempIsbn}
          isColorSearch={isColorSearch}
          onClick={handleAddClick}
        />
      )}

      <FloatingButton />
    </PageTemplate>
  )
}

export default SearchPage
