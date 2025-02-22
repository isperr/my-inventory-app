import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {Paper, TextField, Typography} from '@mui/material'
import {useNotifications} from '@toolpad/core'

import FloatingButton from '../../atoms/FloatingButton'
import Button from '../../atoms/Button'
import {resolved} from '../../modules/catania/results/slice'
import {
  load,
  loaded,
  loadingError,
  reset,
  selectData,
  selectError,
  selectIsLoaded,
  selectIsLoading
} from '../../modules/catania/search/slice'
import PageTemplate from '../../templates/Page'
import {getToastConfig} from '../../utils/toast/get-toast-config'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'

import {onResolveDataByIsbn} from '../ColorPage/hooks/use-resolve'
import CataniaPreview from '../HomePage/components/CataniaPreview'
import {setIsbn} from '../../modules/catania/add/slice'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const notifications = useNotifications()

  const data = useAppSelector(selectData)
  const error = useAppSelector(selectError)
  const isLoaded = useAppSelector(selectIsLoaded)
  const isLoading = useAppSelector(selectIsLoading)

  const onLoadData = useCallback(async (isbn: number) => {
    try {
      dispatch(load())
      const searchData = await onResolveDataByIsbn(isbn)
      if (searchData) {
        dispatch(resolved({data: searchData, id: searchData.color.toString()}))
      }
      dispatch(loaded(searchData))
      dispatch(setIsbn(isbn))
    } catch (error) {
      dispatch(loadingError(error as Error))
      notifications.show(
        'Beim Suchen des Wollknäuels ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      isbn: {value: string}
    }

    await onLoadData(Number(formElements.isbn.value))
  }

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  return (
    <PageTemplate className="h-fit gap-4">
      <Paper className="mx-6" elevation={0}>
        <Typography color="textSecondary" variant="h6">
          Wollknäuel scannen:
        </Typography>
      </Paper>

      <form className="mx-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          className="w-full"
          id="isbn"
          label="ISBN"
          type="number"
          variant="outlined"
          required
        />
        <Button size="small" type="submit">
          Suchen
        </Button>
      </form>

      <CataniaPreview
        data={data}
        hasError={Boolean(error)}
        isLoading={isLoading}
        showHeader={isLoaded && Boolean(data.length)}
      />
      {!error && isLoaded && !data.length && (
        <Paper className="mx-6 flex flex-col gap-4" elevation={0}>
          <Typography className="font-normal" variant="h6">
            Das Wollknäuel ist noch nicht Teil deines Bestands!
          </Typography>
          <div className="flex flex-wrap gap-1">
            <Typography className="font-normal" variant="h6">
              Möchtest du dieses Wollknäuel zu
            </Typography>
            <Typography variant="h6">Schachermayr Catania Color</Typography>
            <Typography className="font-normal" variant="h6">
              hinzufügen?
            </Typography>
          </div>
          <Button onClick={() => navigate('/scan/add')} size="small">
            Ja, hinzufügen
          </Button>
        </Paper>
      )}

      <FloatingButton />
    </PageTemplate>
  )
}

export default SearchPage
