import {createResultsSelectors} from '../../utils/results/selectors'

export const {
  selectData,
  selectEntities,
  selectError,
  selectIsActivated,
  selectIsLoaded,
  selectIsLoading,
  selectIsUpdated,
  selectIsUpdating,
  selectUpdateError,
  // resolving selectors
  selectIsResolved,
  selectIsResolving,
  selectResolveError,
  selectHasResolveError,
  selectIsIdResolved,
  selectIsIdResolving,
  selectIsUpdatingType,
  selectResolveData
} = createResultsSelectors('fluffy')
