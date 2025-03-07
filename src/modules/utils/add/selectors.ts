import {RootState} from '../../../utils/store'

export type AddState = Pick<
  RootState,
  // add all add modules here in order for the util to work
  'schachenmayrAdd' | 'gruendlAdd'
>

export const createAddSelectors = (name: keyof AddState) => {
  // Other code such as selectors can use the imported `RootState` type
  const selectColor = (state: RootState) => state[name].color
  const selectIsbn = (state: RootState) => state[name].isbn
  const selectIsAdded = (state: RootState) => state[name].isAdded
  const selectIsAdding = (state: RootState) => state[name].isAdding
  const selectError = (state: RootState) => state[name].error

  return {
    selectColor,
    selectError,
    selectIsAdded,
    selectIsAdding,
    selectIsbn
  }
}
