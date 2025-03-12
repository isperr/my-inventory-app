import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import {Paper, Typography} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import Loading from '../../atoms/ListPreview/Loading'
import NotInList from '../../atoms/ListPreview/NotInList'
import {reset} from '../../modules/wool/add/slice'
import PageTemplate from '../../templates/Page'
import {useAppDispatch} from '../../utils/store-hooks'

import SearchInputs from './components/SearchInputs'
import SearchPreview from './components/SearchPreview'
import {useCumulativeState} from './hooks/use-cumulative-state'
import {useSearchData} from './hooks/use-search-data'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [tempIsbn, setTempIsbn] = useState<number | undefined>(undefined)
  const [tempColor, setTempColor] = useState<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  const {onLoadData: onLoadCataniaData} = useSearchData('catania')
  const {onLoadData: onLoadCataniaColorData} = useSearchData('catania-color')
  const {onLoadData: onLoadCottonQuickData} = useSearchData('cotton-quick')
  const {onLoadData: onLoadCottonQuickPrintData} =
    useSearchData('cotton-quick-print')
  const {onLoadData: onLoadFunnyUniData} = useSearchData('funny-uni')
  const {onLoadData: onLoadSamtData} = useSearchData('samt')
  const {onLoadData: onLoadSamtBabyData} = useSearchData('samt-baby')

  const {hasNoData, isInAllCollections, isLoaded, isLoading} =
    useCumulativeState()

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

    await onLoadCataniaData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })

    await onLoadCataniaColorData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })

    await onLoadCottonQuickData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })

    await onLoadCottonQuickPrintData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })

    await onLoadFunnyUniData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })

    await onLoadSamtData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })

    await onLoadSamtBabyData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })
  }

  const handleAddClick = () => {
    navigate('/scan/add')
    setTempIsbn(undefined)
    setTempColor(undefined)
  }

  return (
    <PageTemplate className="h-fit gap-4">
      <Paper className="mx-6" elevation={0}>
        <Typography variant="h5">Wollknäuel scannen:</Typography>
      </Paper>

      <SearchInputs
        handleSubmit={handleSubmit}
        handleSearchTypeChange={handleSearchTypeChange}
        isColorSearch={isColorSearch}
      />

      <SearchPreview collection="catania" />
      <SearchPreview collection="catania-color" />
      <SearchPreview collection="cotton-quick-print" />
      <SearchPreview collection="cotton-quick" />
      <SearchPreview collection="funny-uni" />
      <SearchPreview collection="samt" />
      <SearchPreview collection="samt-baby" />

      {isLoading && <Loading />}
      {hasNoData && (
        <NotInList
          amount="none"
          color={tempColor}
          isbn={tempIsbn}
          onClick={handleAddClick}
        />
      )}
      {isLoaded && !hasNoData && !isInAllCollections && (
        <NotInList
          amount="some"
          color={tempColor}
          isbn={tempIsbn}
          onClick={handleAddClick}
        />
      )}

      <FloatingButton />
    </PageTemplate>
  )
}

export default SearchPage
