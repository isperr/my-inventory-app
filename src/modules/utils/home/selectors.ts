import {RootState} from '../../../utils/store'

export type HomeState = Pick<
  RootState,
  // add all search modules here in order for the util to work
  | 'cataniaHome'
  | 'cataniaColorHome'
  | 'cottonQuickHome'
  | 'cottonQuickPrintHome'
  | 'funnyUniHome'
  | 'samtHome'
  | 'samtBabyHome'
  | 'dolphinBabyHome'
  | 'babySnuggleHome'
>

export const createHomeSelectors = (name: keyof HomeState) => {
  // Other code such as selectors can use the imported `RootState` type
  const selectData = (state: RootState) => state[name].data
  const selectEntities = (state: RootState) => state[name].entities
  const selectIsLoaded = (state: RootState) => state[name].isLoaded
  const selectIsLoading = (state: RootState) => state[name].isLoading
  const selectError = (state: RootState) => state[name].error

  return {
    selectData,
    selectEntities,
    selectError,
    selectIsLoaded,
    selectIsLoading
  }
}
