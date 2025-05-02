import {memo, useCallback, useState} from 'react'
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

import Button from '../../../atoms/Button'
import {selectCatgegoryFilter} from '../../../modules/finished-items/results/selectors'
import {setCategoryFilter} from '../../../modules/finished-items/results/slice'
import {categoryNames, ItemCategory} from '../../../modules/types'
import {useAppDispatch, useAppSelector} from '../../../utils/store-hooks'

const FilterDialog = () => {
  const dispatch = useAppDispatch()
  const categoryFilter = useAppSelector(selectCatgegoryFilter)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<Array<ItemCategory>>([])

  const handleClick = () => {
    setFilter(categoryFilter)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setFilter([])
  }

  const handleConfirm = useCallback(() => {
    dispatch(setCategoryFilter(filter))
    closeDialog()
  }, [dispatch, filter, closeDialog])

  const handleSelectAll = () => {
    setFilter(['keychain', 'plushy', 'regular'])
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterName = event.target.name as ItemCategory
    const isChecked = event.target.checked
    if (isChecked) {
      setFilter(prevState => [...prevState, filterName].sort())
    } else {
      setFilter(prevState => prevState.filter(it => it !== filterName))
    }
  }

  return (
    <>
      <IconButton
        aria-label="remove"
        className="absolute right-0 top-1"
        color="secondary"
        onClick={handleClick}
      >
        <FilterListIcon
          color="inherit"
          className="text-[3rem]"
          fontSize="inherit"
        />
      </IconButton>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Kategorie-Filter ändern</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">
              Kategorien (mind. 1 auswählen)
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.includes('keychain')}
                    onChange={handleChange}
                    name="keychain"
                  />
                }
                label={categoryNames.keychain}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.includes('plushy')}
                    onChange={handleChange}
                    name="plushy"
                  />
                }
                label={categoryNames.plushy}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.includes('regular')}
                    onChange={handleChange}
                    name="regular"
                  />
                }
                label={categoryNames.regular}
              />
            </FormGroup>
            <FormHelperText>
              Wähle die Kategorien an/ab nach denen gefiltert werden soll.
            </FormHelperText>
          </FormControl>

          <Button
            className="mt-3"
            fullWidth
            isDisabled={filter.length === 3}
            onClick={handleSelectAll}
            size="small"
          >
            Alle auswählen
          </Button>
        </DialogContent>
        <DialogActions className="pb-5 px-6 flex justify-evenly items-center">
          <Button className="flex-1" onClick={closeDialog} variant="outlined">
            Abbrechen
          </Button>
          <Button
            className="flex-1"
            autoFocus
            isDisabled={!filter.length}
            onClick={handleConfirm}
          >
            Filtern
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(FilterDialog)
