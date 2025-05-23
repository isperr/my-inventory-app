import {RootState} from '../../../utils/store'

export type SearchState = Pick<
  RootState,
  // add all search modules here in order for the util to work
  | 'cataniaColorSearch'
  | 'cataniaSearch'
  | 'cottonQuickSearch'
  | 'cottonQuickPrintSearch'
  | 'funnyUniSearch'
  | 'kingCottonSearch'
  | 'lisaPremiumUniSearch'
  | 'samtSearch'
  | 'samtBabySearch'
  | 'dolphinBabySearch'
  | 'babySnuggleSearch'
>

export const createSearchSelectors = (name: keyof SearchState) => {
  // Other code such as selectors can use the imported `RootState` type
  const selectData = (state: RootState) => state[name].data
  const selectIsLoaded = (state: RootState) => state[name].isLoaded
  const selectIsLoading = (state: RootState) => state[name].isLoading
  const selectError = (state: RootState) => state[name].error

  return {
    selectData,
    selectError,
    selectIsLoaded,
    selectIsLoading
  }
}
