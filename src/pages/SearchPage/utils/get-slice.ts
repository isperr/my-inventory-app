// SCHACHENMAYR
import {
  load as loadCatania,
  loaded as loadedCatania,
  loadingError as loadingCataniaError,
  reset as resetCatania,
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
  reset as resetCataniaColor,
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/search/slice'
import {resolved as resolvedColor} from '../../../modules/catania-color/results/slice'

// GRÜNDL
import {
  load as loadCottonQuick,
  loaded as loadedCottonQuick,
  loadingError as loadingCottonQuickError,
  reset as resetCottonQuick,
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
  reset as resetCottonQuickPrint,
  selectData as selectDataCottonQuickPrint,
  selectError as selectErrorCottonQuickPrint,
  selectIsLoaded as selectIsLoadedCottonQuickPrint,
  selectIsLoading as selectIsLoadingCottonQuickPrint
} from '../../../modules/cotton-quick-print/search/slice'
import {resolved as resolvedCottonQuickPrint} from '../../../modules/cotton-quick-print/results/slice'
import {
  load as loadFunnyUni,
  loaded as loadedFunnyUni,
  loadingError as loadingFunnyUniError,
  reset as resetFunnyUni,
  selectData as selectDataFunnyUni,
  selectError as selectErrorFunnyUni,
  selectIsLoaded as selectIsLoadedFunnyUni,
  selectIsLoading as selectIsLoadingFunnyUni
} from '../../../modules/funny-uni/search/slice'
import {resolved as resolvedFunnyUni} from '../../../modules/funny-uni/results/slice'
import {
  load as loadKingCotton,
  loaded as loadedKingCotton,
  loadingError as loadingKingCottonError,
  reset as resetKingCotton,
  selectData as selectDataKingCotton,
  selectError as selectErrorKingCotton,
  selectIsLoaded as selectIsLoadedKingCotton,
  selectIsLoading as selectIsLoadingKingCotton
} from '../../../modules/king-cotton/search/slice'
import {resolved as resolvedKingCotton} from '../../../modules/king-cotton/results/slice'
import {
  load as loadLisaPremiumUni,
  loaded as loadedLisaPremiumUni,
  loadingError as loadingLisaPremiumUniError,
  reset as resetLisaPremiumUni,
  selectData as selectDataLisaPremiumUni,
  selectError as selectErrorLisaPremiumUni,
  selectIsLoaded as selectIsLoadedLisaPremiumUni,
  selectIsLoading as selectIsLoadingLisaPremiumUni
} from '../../../modules/lisa-premium-uni/search/slice'
import {resolved as resolvedLisaPremiumUni} from '../../../modules/lisa-premium-uni/results/slice'

// MYBOSHI
import {
  load as loadSamt,
  loaded as loadedSamt,
  loadingError as loadingSamtError,
  reset as resetSamt,
  selectData as selectDataSamt,
  selectError as selectErrorSamt,
  selectIsLoaded as selectIsLoadedSamt,
  selectIsLoading as selectIsLoadingSamt
} from '../../../modules/samt/search/slice'
import {resolved as resolvedSamt} from '../../../modules/samt/results/slice'

// AYOS
import {
  load as loadSamtBaby,
  loaded as loadedSamtBaby,
  loadingError as loadingSamtBabyError,
  reset as resetSamtBaby,
  selectData as selectDataSamtBaby,
  selectError as selectErrorSamtBaby,
  selectIsLoaded as selectIsLoadedSamtBaby,
  selectIsLoading as selectIsLoadingSamtBaby
} from '../../../modules/samt-baby/search/slice'
import {resolved as resolvedSamtBaby} from '../../../modules/samt-baby/results/slice'

// HIMALAYA
import {
  load as loadDolphinBaby,
  loaded as loadedDolphinBaby,
  loadingError as loadingDolphinBabyError,
  reset as resetDolphinBaby,
  selectData as selectDataDolphinBaby,
  selectError as selectErrorDolphinBaby,
  selectIsLoaded as selectIsLoadedDolphinBaby,
  selectIsLoading as selectIsLoadingDolphinBaby
} from '../../../modules/dolphin-baby/search/slice'
import {resolved as resolvedDolphinBaby} from '../../../modules/dolphin-baby/results/slice'

// HOBBII
import {
  load as loadBabySnuggle,
  loaded as loadedBabySnuggle,
  loadingError as loadingBabySnuggleError,
  reset as resetBabySnuggle,
  selectData as selectDataBabySnuggle,
  selectError as selectErrorBabySnuggle,
  selectIsLoaded as selectIsLoadedBabySnuggle,
  selectIsLoading as selectIsLoadingBabySnuggle
} from '../../../modules/baby-snuggle-solid/search/slice'
import {resolved as resolvedBabySnuggle} from '../../../modules/baby-snuggle-solid/results/slice'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'king-cotton':
      return {
        load: loadKingCotton,
        loaded: loadedKingCotton,
        loadingError: loadingKingCottonError,
        resolved: resolvedKingCotton,
        reset: resetKingCotton
      }
    case 'lisa-premium-uni':
      return {
        load: loadLisaPremiumUni,
        loaded: loadedLisaPremiumUni,
        loadingError: loadingLisaPremiumUniError,
        resolved: resolvedLisaPremiumUni,
        reset: resetLisaPremiumUni
      }
    case 'baby-snuggle-solid':
      return {
        load: loadBabySnuggle,
        loaded: loadedBabySnuggle,
        loadingError: loadingBabySnuggleError,
        resolved: resolvedBabySnuggle,
        reset: resetBabySnuggle
      }
    case 'dolphin-baby':
      return {
        load: loadDolphinBaby,
        loaded: loadedDolphinBaby,
        loadingError: loadingDolphinBabyError,
        resolved: resolvedDolphinBaby,
        reset: resetDolphinBaby
      }
    case 'samt':
      return {
        load: loadSamt,
        loaded: loadedSamt,
        loadingError: loadingSamtError,
        resolved: resolvedSamt,
        reset: resetSamt
      }
    case 'samt-baby':
      return {
        load: loadSamtBaby,
        loaded: loadedSamtBaby,
        loadingError: loadingSamtBabyError,
        resolved: resolvedSamtBaby,
        reset: resetSamtBaby
      }
    case 'funny-uni':
      return {
        load: loadFunnyUni,
        loaded: loadedFunnyUni,
        loadingError: loadingFunnyUniError,
        resolved: resolvedFunnyUni,
        reset: resetFunnyUni
      }
    case 'cotton-quick':
      return {
        load: loadCottonQuick,
        loaded: loadedCottonQuick,
        loadingError: loadingCottonQuickError,
        resolved: resolvedCottonQuick,
        reset: resetCottonQuick
      }
    case 'cotton-quick-print':
      return {
        load: loadCottonQuickPrint,
        loaded: loadedCottonQuickPrint,
        loadingError: loadingCottonQuickPrintError,
        resolved: resolvedCottonQuickPrint,
        reset: resetCottonQuickPrint
      }
    case 'catania-color':
      return {
        load: loadColor,
        loaded: loadedColor,
        loadingError: loadingColorError,
        resolved: resolvedColor,
        reset: resetCataniaColor
      }
    case 'catania':
    default:
      return {
        load: loadCatania,
        loaded: loadedCatania,
        loadingError: loadingCataniaError,
        resolved: resolvedCatania,
        reset: resetCatania
      }
  }
}

export const getSelectors = (collection: CollectionType) => {
  switch (collection) {
    case 'king-cotton':
      return {
        selectData: selectDataKingCotton,
        selectError: selectErrorKingCotton,
        selectIsLoaded: selectIsLoadedKingCotton,
        selectIsLoading: selectIsLoadingKingCotton
      }
    case 'lisa-premium-uni':
      return {
        selectData: selectDataLisaPremiumUni,
        selectError: selectErrorLisaPremiumUni,
        selectIsLoaded: selectIsLoadedLisaPremiumUni,
        selectIsLoading: selectIsLoadingLisaPremiumUni
      }
    case 'baby-snuggle-solid':
      return {
        selectData: selectDataBabySnuggle,
        selectError: selectErrorBabySnuggle,
        selectIsLoaded: selectIsLoadedBabySnuggle,
        selectIsLoading: selectIsLoadingBabySnuggle
      }
    case 'dolphin-baby':
      return {
        selectData: selectDataDolphinBaby,
        selectError: selectErrorDolphinBaby,
        selectIsLoaded: selectIsLoadedDolphinBaby,
        selectIsLoading: selectIsLoadingDolphinBaby
      }
    case 'samt':
      return {
        selectData: selectDataSamt,
        selectError: selectErrorSamt,
        selectIsLoaded: selectIsLoadedSamt,
        selectIsLoading: selectIsLoadingSamt
      }
    case 'samt-baby':
      return {
        selectData: selectDataSamtBaby,
        selectError: selectErrorSamtBaby,
        selectIsLoaded: selectIsLoadedSamtBaby,
        selectIsLoading: selectIsLoadingSamtBaby
      }
    case 'funny-uni':
      return {
        selectData: selectDataFunnyUni,
        selectError: selectErrorFunnyUni,
        selectIsLoaded: selectIsLoadedFunnyUni,
        selectIsLoading: selectIsLoadingFunnyUni
      }
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
    case 'catania':
      return {
        selectData: selectDataCatania,
        selectError: selectErrorCatania,
        selectIsLoaded: selectIsLoadedCatania,
        selectIsLoading: selectIsLoadingCatania
      }
  }
}
