import {FormControlLabel, Switch, TextField} from '@mui/material'
import Button from '../../../atoms/Button'

export type SearchInputsProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleSearchTypeChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined
  isColorSearch: boolean
}

const SearchInputs = ({
  handleSubmit,
  isColorSearch,
  handleSearchTypeChange
}: SearchInputsProps) => {
  return (
    <form className="mx-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormControlLabel
        value="isColorSearch"
        control={
          <Switch
            checked={isColorSearch}
            onChange={handleSearchTypeChange}
            inputProps={{'aria-label': 'controlled'}}
          />
        }
        label={
          <>
            Nach <b>{isColorSearch ? 'Farbe' : 'ISBN'}</b> suchen:
          </>
        }
      />
      {isColorSearch && (
        <TextField
          autoFocus
          className="w-full"
          id="color"
          label="Farbe"
          type="number"
          variant="outlined"
          required
        />
      )}
      {!isColorSearch && (
        <TextField
          autoFocus
          className="w-full"
          id="isbn"
          label="ISBN"
          type="number"
          variant="outlined"
          required
        />
      )}
      <Button size="small" type="submit">
        Suchen
      </Button>
    </form>
  )
}

export default SearchInputs
