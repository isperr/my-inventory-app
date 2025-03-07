import {createAddSlice} from '../../utils/add/slice'
import {createAddSelectors} from '../../utils/add/selectors'

/* USED FOR SCHACHENMAYR (CATANIA, CATANIA COLOR) */
export const schachenmayrAddState = createAddSlice('schachenmayrAdd')

export const {add, added, addingError, reset, setIsbnOrColor} =
  schachenmayrAddState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectColor,
  selectError,
  selectIsAdded,
  selectIsAdding,
  selectIsbn
} = createAddSelectors('gruendlAdd')

export default schachenmayrAddState.reducer
