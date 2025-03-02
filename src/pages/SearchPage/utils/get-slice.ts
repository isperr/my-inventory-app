import {
  load as loadReg,
  loaded as loadedReg,
  loadingError as loadingRegError,
  selectData as selectDataReg,
  selectError as selectErrorReg,
  selectIsLoaded as selectIsLoadedReg,
  selectIsLoading as selectIsLoadingReg
} from '../../../modules/catania/search/slice'
import {
  load as loadColor,
  loaded as loadedColor,
  loadingError as loadingColorError,
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/search/slice'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  if (collection === 'catania-color') {
    return {
      load: loadColor,
      loaded: loadedColor,
      loadingError: loadingColorError
    }
  }
  return {
    load: loadReg,
    loaded: loadedReg,
    loadingError: loadingRegError
  }
}

export const getSelectors = (collection: CollectionType) => {
  if (collection === 'catania-color') {
    return {
      selectData: selectDataColor,
      selectError: selectErrorColor,
      selectIsLoaded: selectIsLoadedColor,
      selectIsLoading: selectIsLoadingColor
    }
  }
  return {
    selectData: selectDataReg,
    selectError: selectErrorReg,
    selectIsLoaded: selectIsLoadedReg,
    selectIsLoading: selectIsLoadingReg
  }
}
