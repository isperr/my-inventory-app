import {useCallback, useState} from 'react'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import {Paper, Typography} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import Loading from '../../atoms/ListPreview/Loading'
import NotInList from '../../atoms/ListPreview/NotInList'
import WoolListPreview from '../../molecules/WoolListPreview'
import {WoolListItemType} from '../../molecules/WoolList/components/WoolListItem'
import PageTemplate from '../../templates/Page'

import {useSearchData} from './hooks/use-search-data'
import SearchInputs from './components/SearchInputs'

// always change if there are more collections added
const COLLECTION_COUNT = 7

const SearchPage = () => {
  const navigate = useNavigate()

  const [tempIsbn, setTempIsbn] = useState<number | undefined>(undefined)
  const [tempColor, setTempColor] = useState<number | undefined>(undefined)

  const {
    data: cataniaData,
    hasError: hasCataniaError,
    hasNoData: hasNoCataniaData,
    isLoaded: isCataniaLoaded,
    isLoading: isCataniaLoading,
    onLoadData: onLoadCataniaData
  } = useSearchData('catania')
  const {
    data: cataniaColorData,
    hasError: hasCataniaColorError,
    hasNoData: hasNoCataniaColorData,
    isLoaded: isCataniaColorLoaded,
    isLoading: isCataniaColorLoading,
    onLoadData: onLoadCataniaColorData
  } = useSearchData('catania-color')
  const {
    data: cottonQuickData,
    hasError: hasCottonQuickError,
    hasNoData: hasNoCottonQuickData,
    isLoaded: isCottonQuickLoaded,
    isLoading: isCottonQuickLoading,
    onLoadData: onLoadCottonQuickData
  } = useSearchData('cotton-quick')
  const {
    data: cottonQuickPrintData,
    hasError: hasCottonQuickPrintError,
    hasNoData: hasNoCottonQuickPrintData,
    isLoaded: isCottonQuickPrintLoaded,
    isLoading: isCottonQuickPrintLoading,
    onLoadData: onLoadCottonQuickPrintData
  } = useSearchData('cotton-quick-print')
  const {
    data: funnyUniData,
    hasError: hasFunnyUniError,
    hasNoData: hasNoFunnyUniData,
    isLoaded: isFunnyUniLoaded,
    isLoading: isFunnyUniLoading,
    onLoadData: onLoadFunnyUniData
  } = useSearchData('funny-uni')
  const {
    data: samtData,
    hasError: hasSamtError,
    hasNoData: hasNoSamtData,
    isLoaded: isSamtLoaded,
    isLoading: isSamtLoading,
    onLoadData: onLoadSamtData
  } = useSearchData('samt')
  const {
    data: samtBabyData,
    hasError: hasSamtBabyError,
    hasNoData: hasNoSamtBabyData,
    isLoaded: isSamtBabyLoaded,
    isLoading: isSamtBabyLoading,
    onLoadData: onLoadSamtBabyData
  } = useSearchData('samt-baby')

  const hasNoData =
    hasNoCataniaData &&
    hasNoCataniaColorData &&
    hasNoCottonQuickData &&
    hasNoCottonQuickPrintData &&
    hasNoFunnyUniData &&
    hasNoSamtData &&
    hasNoSamtBabyData
  const isLoaded =
    isCataniaLoaded &&
    isCataniaColorLoaded &&
    isCottonQuickLoaded &&
    isCottonQuickPrintLoaded &&
    isFunnyUniLoaded &&
    isSamtLoaded &&
    isSamtBabyLoaded
  const isLoading =
    isCataniaLoading ||
    isCataniaColorLoading ||
    isCottonQuickLoading ||
    isCottonQuickPrintLoading ||
    isFunnyUniLoading ||
    isSamtLoading ||
    isSamtBabyLoading
  const isInAllCollections =
    cataniaData.length +
      cataniaColorData.length +
      cottonQuickData.length +
      cottonQuickPrintData.length +
      funnyUniData.length +
      samtData.length +
      samtBabyData.length ===
    COLLECTION_COUNT

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

      <WoolListPreview
        collection="catania"
        data={cataniaData as WoolListItemType[]}
        hasError={hasCataniaError}
        isLoaded={isCataniaLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isCataniaLoaded && Boolean(cataniaData.length)) && 'hidden'
        )}
      />

      <WoolListPreview
        collection="catania-color"
        data={cataniaColorData as WoolListItemType[]}
        hasError={hasCataniaColorError}
        isLoaded={isCataniaColorLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isCataniaColorLoaded && Boolean(cataniaColorData.length)) &&
            'hidden'
        )}
      />

      <WoolListPreview
        collection="cotton-quick"
        data={cottonQuickData as WoolListItemType[]}
        hasError={hasCottonQuickError}
        isLoaded={isCottonQuickLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isCottonQuickLoaded && Boolean(cottonQuickData.length)) && 'hidden'
        )}
      />

      <WoolListPreview
        collection="cotton-quick-print"
        data={cottonQuickPrintData as WoolListItemType[]}
        hasError={hasCottonQuickPrintError}
        isLoaded={isCottonQuickPrintLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isCottonQuickPrintLoaded && Boolean(cottonQuickPrintData.length)) &&
            'hidden'
        )}
      />

      <WoolListPreview
        collection="funny-uni"
        data={funnyUniData as WoolListItemType[]}
        hasError={hasFunnyUniError}
        isLoaded={isFunnyUniLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isFunnyUniLoaded && Boolean(funnyUniData.length)) && 'hidden'
        )}
      />

      <WoolListPreview
        collection="samt"
        data={samtData as WoolListItemType[]}
        hasError={hasSamtError}
        isLoaded={isSamtLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isSamtLoaded && Boolean(samtData.length)) && 'hidden'
        )}
      />

      <WoolListPreview
        collection="samt-baby"
        data={samtBabyData as WoolListItemType[]}
        hasError={hasSamtBabyError}
        isLoaded={isSamtBabyLoaded}
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isSamtBabyLoaded && Boolean(samtBabyData.length)) && 'hidden'
        )}
      />

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
