import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import {Paper, Typography} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import Loading from '../../atoms/ListPreview/Loading'
import NotInList from '../../atoms/ListPreview/NotInList'
import {reset, setIsbnOrColor} from '../../modules/wool/add/slice'
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

  const {onLoadData: onLoadCataniaData, onReset: onResetCatania} =
    useSearchData('catania')
  const {onLoadData: onLoadCataniaColorData, onReset: onResetCataniaColor} =
    useSearchData('catania-color')
  const {onLoadData: onLoadCottonQuickData, onReset: onResetCottonQuick} =
    useSearchData('cotton-quick')
  const {
    onLoadData: onLoadCottonQuickPrintData,
    onReset: onResetCottonQuickPrint
  } = useSearchData('cotton-quick-print')
  const {onLoadData: onLoadFunnyUniData, onReset: onResetFunnyUni} =
    useSearchData('funny-uni')
  const {onLoadData: onLoadSamtData, onReset: onResetSamt} =
    useSearchData('samt')
  const {onLoadData: onLoadSamtBabyData, onReset: onResetSamtBaby} =
    useSearchData('samt-baby')
  const {onLoadData: onLoadDolphinBabyData, onReset: onResetDolphinBaby} =
    useSearchData('dolphin-baby')

  useEffect(() => {
    return () => {
      dispatch(reset())

      // reset all search-states
      onResetCatania()
      onResetCataniaColor()
      onResetCottonQuick()
      onResetCottonQuickPrint()
      onResetFunnyUni()
      onResetSamt()
      onResetSamtBaby()
      onResetDolphinBaby()
    }
  }, [])

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

    const num = isColorSearch
      ? Number(formElements.color.value)
      : Number(formElements.isbn.value)

    const data = {isColorSearch, num}

    await Promise.all([
      onLoadCataniaData(data),
      onLoadCataniaColorData(data),
      onLoadCottonQuickData(data),
      onLoadCottonQuickPrintData(data),
      onLoadFunnyUniData(data),
      onLoadSamtData(data),
      onLoadSamtBabyData(data),
      onLoadDolphinBabyData(data)
    ])
    // set isbn or color here instead of in the useSearchData hook so it dispatches only once
    dispatch(setIsbnOrColor({data: num, isColorSearch}))
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
      <SearchPreview collection="dolphin-baby" />

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
