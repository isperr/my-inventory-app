import {createAddSelectors} from '../../utils/add/selectors'
import {createAddSlice} from '../../utils/add/slice'

/* USED FOR GRÜNDL (COTTON-QUICK, COTTON-QUICK PRINT FUNNY) */
export const ayosAddState = createAddSlice('ayosAdd')

export const {add, added, addingError, reset, setIsbnOrColor} =
  ayosAddState.actions

// Other code such as selectors can use the imported `RootState` type
export const {
  selectColor,
  selectError,
  selectIsAdded,
  selectIsAdding,
  selectIsbn
} = createAddSelectors('ayosAdd')

export default ayosAddState.reducer
