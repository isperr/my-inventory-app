import {createAddSelectors} from '../../utils/add/selectors'
import {createAddSlice} from '../../utils/add/slice'

/* USED FOR GRÜNDL (COTTON-QUICK, COTTON-QUICK PRINT FUNNY) */
export const woolAddState = createAddSlice('woolAdd')

export const {add, added, addingError, reset, setIsbnOrColor} =
  woolAddState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectColor,
  selectError,
  selectIsAdded,
  selectIsAdding,
  selectIsbn
} = createAddSelectors('woolAdd')

export default woolAddState.reducer
