// catania
import {
  load as loadReg,
  loaded as loadedReg,
  loadingError as loadingRegError,
  setIsActivated as setIsActivatedReg
} from '../../../modules/catania/results/slice'
import {
  selectData as selectDataReg,
  selectError as selectErrorReg,
  selectIsActivated as selectIsActivatedReg,
  selectIsLoaded as selectIsLoadedReg,
  selectIsLoading as selectIsLoadingReg
} from '../../../modules/catania/results/selectors'
// catania-color
import {
  load as loadColor,
  loaded as loadedColor,
  loadingError as loadingColorError,
  setIsActivated as setIsActivatedColor
} from '../../../modules/catania-color/results/slice'
import {
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsActivated as selectIsActivatedColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/results/selectors'
// cotton-quick
import {
  load as loadCottonQuick,
  loaded as loadedCottonQuick,
  loadingError as loadingCottonQuickError,
  setIsActivated as setIsActivatedCottonQuick
} from '../../../modules/cotton-quick/results/slice'
import {
  selectData as selectDataCottonQuick,
  selectError as selectErrorCottonQuick,
  selectIsActivated as selectIsActivatedCottonQuick,
  selectIsLoaded as selectIsLoadedCottonQuick,
  selectIsLoading as selectIsLoadingCottonQuick
} from '../../../modules/cotton-quick/results/selectors'
// cotton-quick-print
import {
  load as loadCottonQuickPrint,
  loaded as loadedCottonQuickPrint,
  loadingError as loadingCottonQuickPrintError,
  setIsActivated as setIsActivatedCottonQuickPrint
} from '../../../modules/cotton-quick-print/results/slice'
import {
  selectData as selectDataCottonQuickPrint,
  selectError as selectErrorCottonQuickPrint,
  selectIsActivated as selectIsActivatedCottonQuickPrint,
  selectIsLoaded as selectIsLoadedCottonQuickPrint,
  selectIsLoading as selectIsLoadingCottonQuickPrint
} from '../../../modules/cotton-quick-print/results/selectors'
// funny-uni
import {
  load as loadFunnyUni,
  loaded as loadedFunnyUni,
  loadingError as loadingFunnyUniError,
  setIsActivated as setIsActivatedFunnyUni
} from '../../../modules/catania/results/slice'
import {
  selectData as selectDataFunnyUni,
  selectError as selectErrorFunnyUni,
  selectIsActivated as selectIsActivatedFunnyUni,
  selectIsLoaded as selectIsLoadedFunnyUni,
  selectIsLoading as selectIsLoadingFunnyUni
} from '../../../modules/catania/results/selectors'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'funny-uni':
      return {
        load: loadFunnyUni,
        loaded: loadedFunnyUni,
        loadingError: loadingFunnyUniError,
        setIsActivated: setIsActivatedFunnyUni
      }
    case 'cotton-quick':
      return {
        load: loadCottonQuick,
        loaded: loadedCottonQuick,
        loadingError: loadingCottonQuickError,
        setIsActivated: setIsActivatedCottonQuick
      }
    case 'cotton-quick-print':
      return {
        load: loadCottonQuickPrint,
        loaded: loadedCottonQuickPrint,
        loadingError: loadingCottonQuickPrintError,
        setIsActivated: setIsActivatedCottonQuickPrint
      }
    case 'catania-color':
      return {
        load: loadColor,
        loaded: loadedColor,
        loadingError: loadingColorError,
        setIsActivated: setIsActivatedColor
      }
    default:
      return {
        load: loadReg,
        loaded: loadedReg,
        loadingError: loadingRegError,
        setIsActivated: setIsActivatedReg
      }
  }
}

export const getSelectors = (collection: CollectionType) => {
  switch (collection) {
    case 'funny-uni':
      return {
        selectData: selectDataFunnyUni,
        selectError: selectErrorFunnyUni,
        selectIsActivated: selectIsActivatedFunnyUni,
        selectIsLoaded: selectIsLoadedFunnyUni,
        selectIsLoading: selectIsLoadingFunnyUni
      }
    case 'cotton-quick':
      return {
        selectData: selectDataCottonQuick,
        selectError: selectErrorCottonQuick,
        selectIsActivated: selectIsActivatedCottonQuick,
        selectIsLoaded: selectIsLoadedCottonQuick,
        selectIsLoading: selectIsLoadingCottonQuick
      }
    case 'cotton-quick-print':
      return {
        selectData: selectDataCottonQuickPrint,
        selectError: selectErrorCottonQuickPrint,
        selectIsActivated: selectIsActivatedCottonQuickPrint,
        selectIsLoaded: selectIsLoadedCottonQuickPrint,
        selectIsLoading: selectIsLoadingCottonQuickPrint
      }
    case 'catania-color':
      return {
        selectData: selectDataColor,
        selectError: selectErrorColor,
        selectIsActivated: selectIsActivatedColor,
        selectIsLoaded: selectIsLoadedColor,
        selectIsLoading: selectIsLoadingColor
      }
    default:
      return {
        selectData: selectDataReg,
        selectError: selectErrorReg,
        selectIsActivated: selectIsActivatedReg,
        selectIsLoaded: selectIsLoadedReg,
        selectIsLoading: selectIsLoadingReg
      }
  }
}
