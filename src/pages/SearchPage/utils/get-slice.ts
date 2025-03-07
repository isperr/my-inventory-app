// SCHACHENMAYR
import {
  load as loadCatania,
  loaded as loadedCatania,
  loadingError as loadingCataniaError,
  selectData as selectDataCatania,
  selectError as selectErrorCatania,
  selectIsLoaded as selectIsLoadedCatania,
  selectIsLoading as selectIsLoadingCatania
} from '../../../modules/catania/search/slice'
import {resolved as resolvedCatania} from '../../../modules/catania/results/slice'
import {
  load as loadColor,
  loaded as loadedColor,
  loadingError as loadingColorError,
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/search/slice'
import {resolved as resolvedColor} from '../../../modules/catania-color/results/slice'
import {
  reset as schachenmayrAddReset,
  setIsbnOrColor as schachenmayrAddSetIsbnOrColor
} from '../../../modules/schachenmayr/add/slice'

// GRÜNDL
import {
  load as loadCottonQuick,
  loaded as loadedCottonQuick,
  loadingError as loadingCottonQuickError,
  selectData as selectDataCottonQuick,
  selectError as selectErrorCottonQuick,
  selectIsLoaded as selectIsLoadedCottonQuick,
  selectIsLoading as selectIsLoadingCottonQuick
} from '../../../modules/cotton-quick/search/slice'
import {resolved as resolvedCottonQuick} from '../../../modules/cotton-quick/results/slice'
import {
  load as loadCottonQuickPrint,
  loaded as loadedCottonQuickPrint,
  loadingError as loadingCottonQuickPrintError,
  selectData as selectDataCottonQuickPrint,
  selectError as selectErrorCottonQuickPrint,
  selectIsLoaded as selectIsLoadedCottonQuickPrint,
  selectIsLoading as selectIsLoadingCottonQuickPrint
} from '../../../modules/cotton-quick-print/search/slice'
import {resolved as resolvedCottonQuickPrint} from '../../../modules/cotton-quick-print/results/slice'
import {
  reset as gruendlAddReset,
  setIsbnOrColor as gruendlAddSetIsbnOrColor
} from '../../../modules/gruendl/add/slice'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        load: loadCottonQuick,
        loaded: loadedCottonQuick,
        loadingError: loadingCottonQuickError,
        resolved: resolvedCottonQuick
      }
    case 'cotton-quick-print':
      return {
        load: loadCottonQuickPrint,
        loaded: loadedCottonQuickPrint,
        loadingError: loadingCottonQuickPrintError,
        resolved: resolvedCottonQuickPrint
      }
    case 'catania-color':
      return {
        load: loadColor,
        loaded: loadedColor,
        loadingError: loadingColorError,
        resolved: resolvedColor
      }
    default:
      return {
        load: loadCatania,
        loaded: loadedCatania,
        loadingError: loadingCataniaError,
        resolved: resolvedCatania
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
    case 'cotton-quick-print':
      return {
        selectData: selectDataCottonQuickPrint,
        selectError: selectErrorCottonQuickPrint,
        selectIsLoaded: selectIsLoadedCottonQuickPrint,
        selectIsLoading: selectIsLoadingCottonQuickPrint
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
        selectData: selectDataCatania,
        selectError: selectErrorCatania,
        selectIsLoaded: selectIsLoadedCatania,
        selectIsLoading: selectIsLoadingCatania
      }
  }
}

export const getAddActions = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
    case 'cotton-quick-print':
    case 'funny':
      return {
        reset: gruendlAddReset,
        setIsbnOrColor: gruendlAddSetIsbnOrColor
      }
    default:
      return {
        reset: schachenmayrAddReset,
        setIsbnOrColor: schachenmayrAddSetIsbnOrColor
      }
  }
}
