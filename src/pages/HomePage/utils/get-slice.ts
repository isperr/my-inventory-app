import {
  load as loadReg,
  loaded as loadedReg,
  loadingError as loadingRegError,
  selectData as selectDataReg,
  selectError as selectErrorReg,
  selectIsLoaded as selectIsLoadedReg,
  selectIsLoading as selectIsLoadingReg
} from '../../../modules/catania/home/slice'
import {
  load as loadColor,
  loaded as loadedColor,
  loadingError as loadingColorError,
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/home/slice'
import {
  load as loadCottonQuick,
  loaded as loadedCottonQuick,
  loadingError as loadingCottonQuickError,
  selectData as selectDataCottonQuick,
  selectError as selectErrorCottonQuick,
  selectIsLoaded as selectIsLoadedCottonQuick,
  selectIsLoading as selectIsLoadingCottonQuick
} from '../../../modules/cotton-quick/home/slice'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        load: loadCottonQuick,
        loaded: loadedCottonQuick,
        loadingError: loadingCottonQuickError
      }
    case 'catania-color':
      return {
        load: loadColor,
        loaded: loadedColor,
        loadingError: loadingColorError
      }
    default:
      return {
        load: loadReg,
        loaded: loadedReg,
        loadingError: loadingRegError
      }
  }
}

export const getSelectors = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        selectData: selectDataCottonQuick,
        selectError: selectErrorCottonQuick,
        selectIsLoaded: selectIsLoadedCottonQuick,
        selectIsLoading: selectIsLoadingCottonQuick
      }
    case 'catania-color':
      return {
        selectData: selectDataColor,
        selectError: selectErrorColor,
        selectIsLoaded: selectIsLoadedColor,
        selectIsLoading: selectIsLoadingColor
      }
    default:
      return {
        selectData: selectDataReg,
        selectError: selectErrorReg,
        selectIsLoaded: selectIsLoadedReg,
        selectIsLoading: selectIsLoadingReg
      }
  }
}
