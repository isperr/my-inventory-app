import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import {Paper, Typography} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import Loading from '../../atoms/ListPreview/Loading'
import NotInList from '../../atoms/ListPreview/NotInList'
import {reset as resetCataniaColor} from '../../modules/catania/search/slice'
import PageTemplate from '../../templates/Page'
import {useAppDispatch} from '../../utils/store-hooks'

import WoolListPreview from '../../molecules/WoolListPreview'
import {WoolListItemType} from '../../molecules/WoolList/components/WoolListItem'

import {useLoadCataniaColorData} from './hooks/use-load-catania-color-data'
import SearchInputs from './components/SearchInputs'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [tempIsbn, setTempIsbn] = useState<number | undefined>(undefined)
  const [tempColor, setTempColor] = useState<number | undefined>(undefined)

  const {
    data: cataniaData,
    hasError: hasCataniaColorError,
    isLoaded: isCataniaColorLoaded,
    isLoading: isCataniaColorLoading,
    onLoadData: onLoadCataniaColorData
  } = useLoadCataniaColorData()

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
    console.log('submit', {
      isbn: formElements.isbn?.value,
      color: formElements.color?.value
    })

    if (isColorSearch) {
      setTempColor(Number(formElements.color.value))
    } else {
      setTempIsbn(Number(formElements.isbn.value))
    }

    await onLoadCataniaColorData({
      isColorSearch,
      num: isColorSearch
        ? Number(formElements.color.value)
        : Number(formElements.isbn.value)
    })
  }

  const handleAddCataniaClick = () => {
    navigate('/scan/add')
    setTempIsbn(undefined)
    setTempColor(undefined)
  }

  useEffect(() => {
    return () => {
      dispatch(resetCataniaColor())
    }
  }, [])

  return (
    <PageTemplate className="h-fit gap-4">
      <Paper className="mx-6" elevation={0}>
        <Typography color="textSecondary" variant="h6">
          Wollknäuel scannen:
        </Typography>
      </Paper>

      <SearchInputs
        handleSubmit={handleSubmit}
        handleSearchTypeChange={handleSearchTypeChange}
        isColorSearch={isColorSearch}
      />

      <WoolListPreview
        collection="catania"
        data={cataniaData as WoolListItemType[]}
        hasError={hasCataniaColorError}
        headerText="Schachermayr Catania Color"
        isLoading={false}
        listClassName={twMerge(
          'px-2',
          // only show header & list when data is loaded and has items in list
          !(isCataniaColorLoaded && Boolean(cataniaData.length)) && 'hidden'
        )}
      />

      {
        isCataniaColorLoading && (
          <Loading />
        ) /* should be expanded to isLoading from different wool types */
      }
      {
        !hasCataniaColorError &&
          isCataniaColorLoaded &&
          !cataniaData.length && (
            <NotInList
              color={tempColor}
              isbn={tempIsbn}
              onClick={handleAddCataniaClick}
            />
          ) /* should be expanded to isLoading from different wool types */
      }

      <FloatingButton />
    </PageTemplate>
  )
}

export default SearchPage
