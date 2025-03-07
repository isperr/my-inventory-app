import {createAddSelectors} from '../../utils/add/selectors'
import {createAddSlice} from '../../utils/add/slice'

/* USED FOR GRÜNDL (COTTON-QUICK, COTTON-QUICK PRINT FUNNY) */
export const gruendlAddState = createAddSlice('gruendlAdd')

export const {add, added, addingError, reset, setIsbnOrColor} =
  gruendlAddState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectColor,
  selectError,
  selectIsAdded,
  selectIsAdding,
  selectIsbn
} = createAddSelectors('gruendlAdd')

export default gruendlAddState.reducer
