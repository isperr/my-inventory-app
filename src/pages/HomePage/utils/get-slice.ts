// catania
import {
  load as loadReg,
  loaded as loadedReg,
  loadingError as loadingRegError,
  selectData as selectDataReg,
  selectError as selectErrorReg,
  selectIsLoaded as selectIsLoadedReg,
  selectIsLoading as selectIsLoadingReg
} from '../../../modules/catania/home/slice'
// catania-color
import {
  load as loadColor,
  loaded as loadedColor,
  loadingError as loadingColorError,
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/home/slice'
// cotton-quick
import {
  load as loadCottonQuick,
  loaded as loadedCottonQuick,
  loadingError as loadingCottonQuickError,
  selectData as selectDataCottonQuick,
  selectError as selectErrorCottonQuick,
  selectIsLoaded as selectIsLoadedCottonQuick,
  selectIsLoading as selectIsLoadingCottonQuick
} from '../../../modules/cotton-quick/home/slice'
// cotton-quick-print
import {
  load as loadCottonQuickPrint,
  loaded as loadedCottonQuickPrint,
  loadingError as loadingCottonQuickPrintError,
  selectData as selectDataCottonQuickPrint,
  selectError as selectErrorCottonQuickPrint,
  selectIsLoaded as selectIsLoadedCottonQuickPrint,
  selectIsLoading as selectIsLoadingCottonQuickPrint
} from '../../../modules/cotton-quick-print/home/slice'
// funny-uni
import {
  load as loadFunnyUni,
  loaded as loadedFunnyUni,
  loadingError as loadingFunnyUniError,
  selectData as selectDataFunnyUni,
  selectError as selectErrorFunnyUni,
  selectIsLoaded as selectIsLoadedFunnyUni,
  selectIsLoading as selectIsLoadingFunnyUni
} from '../../../modules/funny-uni/home/slice'
// king-cotton
import {
  load as loadKingCotton,
  loaded as loadedKingCotton,
  loadingError as loadingKingCottonError,
  selectData as selectDataKingCotton,
  selectError as selectErrorKingCotton,
  selectIsLoaded as selectIsLoadedKingCotton,
  selectIsLoading as selectIsLoadingKingCotton
} from '../../../modules/king-cotton/home/slice'
// lisa-premium-uni
import {
  load as loadLisaPremiumUni,
  loaded as loadedLisaPremiumUni,
  loadingError as loadingLisaPremiumUniError,
  selectData as selectDataLisaPremiumUni,
  selectError as selectErrorLisaPremiumUni,
  selectIsLoaded as selectIsLoadedLisaPremiumUni,
  selectIsLoading as selectIsLoadingLisaPremiumUni
} from '../../../modules/lisa-premium-uni/home/slice'
// samt
import {
  load as loadSamt,
  loaded as loadedSamt,
  loadingError as loadingSamtError,
  selectData as selectDataSamt,
  selectError as selectErrorSamt,
  selectIsLoaded as selectIsLoadedSamt,
  selectIsLoading as selectIsLoadingSamt
} from '../../../modules/samt/home/slice'
// samt-baby
import {
  load as loadSamtBaby,
  loaded as loadedSamtBaby,
  loadingError as loadingSamtBabyError,
  selectData as selectDataSamtBaby,
  selectError as selectErrorSamtBaby,
  selectIsLoaded as selectIsLoadedSamtBaby,
  selectIsLoading as selectIsLoadingSamtBaby
} from '../../../modules/samt-baby/home/slice'
// dolphin-baby
import {
  load as loadDolphinBaby,
  loaded as loadedDolphinBaby,
  loadingError as loadingDolphinBabyError,
  selectData as selectDataDolphinBaby,
  selectError as selectErrorDolphinBaby,
  selectIsLoaded as selectIsLoadedDolphinBaby,
  selectIsLoading as selectIsLoadingDolphinBaby
} from '../../../modules/dolphin-baby/home/slice'
// baby-snuggle-solid
import {
  load as loadBabySnuggle,
  loaded as loadedBabySnuggle,
  loadingError as loadingBabySnuggleError,
  selectData as selectDataBabySnuggle,
  selectError as selectErrorBabySnuggle,
  selectIsLoaded as selectIsLoadedBabySnuggle,
  selectIsLoading as selectIsLoadingBabySnuggle
} from '../../../modules/baby-snuggle-solid/home/slice'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'king-cotton':
      return {
        load: loadKingCotton,
        loaded: loadedKingCotton,
        loadingError: loadingKingCottonError
      }
    case 'lisa-premium-uni':
      return {
        load: loadLisaPremiumUni,
        loaded: loadedLisaPremiumUni,
        loadingError: loadingLisaPremiumUniError
      }
    case 'baby-snuggle-solid':
      return {
        load: loadBabySnuggle,
        loaded: loadedBabySnuggle,
        loadingError: loadingBabySnuggleError
      }
    case 'dolphin-baby':
      return {
        load: loadDolphinBaby,
        loaded: loadedDolphinBaby,
        loadingError: loadingDolphinBabyError
      }
    case 'samt':
      return {
        load: loadSamt,
        loaded: loadedSamt,
        loadingError: loadingSamtError
      }
    case 'samt-baby':
      return {
        load: loadSamtBaby,
        loaded: loadedSamtBaby,
        loadingError: loadingSamtBabyError
      }
    case 'funny-uni':
      return {
        load: loadFunnyUni,
        loaded: loadedFunnyUni,
        loadingError: loadingFunnyUniError
      }
    case 'cotton-quick':
      return {
        load: loadCottonQuick,
        loaded: loadedCottonQuick,
        loadingError: loadingCottonQuickError
      }
    case 'cotton-quick-print':
      return {
        load: loadCottonQuickPrint,
        loaded: loadedCottonQuickPrint,
        loadingError: loadingCottonQuickPrintError
      }
    case 'catania-color':
      return {
        load: loadColor,
        loaded: loadedColor,
        loadingError: loadingColorError
      }
    default:
    case 'catania':
      return {
        load: loadReg,
        loaded: loadedReg,
        loadingError: loadingRegError
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
        selectData: selectDataReg,
        selectError: selectErrorReg,
        selectIsLoaded: selectIsLoadedReg,
        selectIsLoading: selectIsLoadingReg
      }
  }
}
