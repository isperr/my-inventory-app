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
} from '../../../modules/funny-uni/results/slice'
import {
  selectData as selectDataFunnyUni,
  selectError as selectErrorFunnyUni,
  selectIsActivated as selectIsActivatedFunnyUni,
  selectIsLoaded as selectIsLoadedFunnyUni,
  selectIsLoading as selectIsLoadingFunnyUni
} from '../../../modules/funny-uni/results/selectors'
// king-cotton
import {
  load as loadKingCotton,
  loaded as loadedKingCotton,
  loadingError as loadingKingCottonError,
  setIsActivated as setIsActivatedKingCotton
} from '../../../modules/king-cotton/results/slice'
import {
  selectData as selectDataKingCotton,
  selectError as selectErrorKingCotton,
  selectIsActivated as selectIsActivatedKingCotton,
  selectIsLoaded as selectIsLoadedKingCotton,
  selectIsLoading as selectIsLoadingKingCotton
} from '../../../modules/king-cotton/results/selectors'
// lisa-premium-uni
import {
  load as loadLisaPremiumUni,
  loaded as loadedLisaPremiumUni,
  loadingError as loadingLisaPremiumUniError,
  setIsActivated as setIsActivatedLisaPremiumUni
} from '../../../modules/lisa-premium-uni/results/slice'
import {
  selectData as selectDataLisaPremiumUni,
  selectError as selectErrorLisaPremiumUni,
  selectIsActivated as selectIsActivatedLisaPremiumUni,
  selectIsLoaded as selectIsLoadedLisaPremiumUni,
  selectIsLoading as selectIsLoadingLisaPremiumUni
} from '../../../modules/lisa-premium-uni/results/selectors'
// samt
import {
  load as loadSamt,
  loaded as loadedSamt,
  loadingError as loadingSamtError,
  setIsActivated as setIsActivatedSamt
} from '../../../modules/samt/results/slice'
import {
  selectData as selectDataSamt,
  selectError as selectErrorSamt,
  selectIsActivated as selectIsActivatedSamt,
  selectIsLoaded as selectIsLoadedSamt,
  selectIsLoading as selectIsLoadingSamt
} from '../../../modules/samt/results/selectors'
// samt-baby
import {
  load as loadSamtBaby,
  loaded as loadedSamtBaby,
  loadingError as loadingSamtBabyError,
  setIsActivated as setIsActivatedSamtBaby
} from '../../../modules/samt-baby/results/slice'
import {
  selectData as selectDataSamtBaby,
  selectError as selectErrorSamtBaby,
  selectIsActivated as selectIsActivatedSamtBaby,
  selectIsLoaded as selectIsLoadedSamtBaby,
  selectIsLoading as selectIsLoadingSamtBaby
} from '../../../modules/samt-baby/results/selectors'
// fluffy
import {
  load as loadFluffy,
  loaded as loadedFluffy,
  loadingError as loadingFluffyError,
  setIsActivated as setIsActivatedFluffy
} from '../../../modules/fluffy/results/slice'
import {
  selectData as selectDataFluffy,
  selectError as selectErrorFluffy,
  selectIsActivated as selectIsActivatedFluffy,
  selectIsLoaded as selectIsLoadedFluffy,
  selectIsLoading as selectIsLoadingFluffy
} from '../../../modules/fluffy/results/selectors'
// dolphin-baby
import {
  load as loadDolphinBaby,
  loaded as loadedDolphinBaby,
  loadingError as loadingDolphinBabyError,
  setIsActivated as setIsActivatedDolphinBaby
} from '../../../modules/dolphin-baby/results/slice'
import {
  selectData as selectDataDolphinBaby,
  selectError as selectErrorDolphinBaby,
  selectIsActivated as selectIsActivatedDolphinBaby,
  selectIsLoaded as selectIsLoadedDolphinBaby,
  selectIsLoading as selectIsLoadingDolphinBaby
} from '../../../modules/dolphin-baby/results/selectors'
// baby-snuggle-solid
import {
  load as loadBabySnuggle,
  loaded as loadedBabySnuggle,
  loadingError as loadingBabySnuggleError,
  setIsActivated as setIsActivatedBabySnuggle
} from '../../../modules/baby-snuggle-solid/results/slice'
import {
  selectData as selectDataBabySnuggle,
  selectError as selectErrorBabySnuggle,
  selectIsActivated as selectIsActivatedBabySnuggle,
  selectIsLoaded as selectIsLoadedBabySnuggle,
  selectIsLoading as selectIsLoadingBabySnuggle
} from '../../../modules/baby-snuggle-solid/results/selectors'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'king-cotton':
      return {
        load: loadKingCotton,
        loaded: loadedKingCotton,
        loadingError: loadingKingCottonError,
        setIsActivated: setIsActivatedKingCotton
      }
    case 'lisa-premium-uni':
      return {
        load: loadLisaPremiumUni,
        loaded: loadedLisaPremiumUni,
        loadingError: loadingLisaPremiumUniError,
        setIsActivated: setIsActivatedLisaPremiumUni
      }
    case 'baby-snuggle-solid':
      return {
        load: loadBabySnuggle,
        loaded: loadedBabySnuggle,
        loadingError: loadingBabySnuggleError,
        setIsActivated: setIsActivatedBabySnuggle
      }
    case 'dolphin-baby':
      return {
        load: loadDolphinBaby,
        loaded: loadedDolphinBaby,
        loadingError: loadingDolphinBabyError,
        setIsActivated: setIsActivatedDolphinBaby
      }
    case 'samt':
      return {
        load: loadSamt,
        loaded: loadedSamt,
        loadingError: loadingSamtError,
        setIsActivated: setIsActivatedSamt
      }
    case 'samt-baby':
      return {
        load: loadSamtBaby,
        loaded: loadedSamtBaby,
        loadingError: loadingSamtBabyError,
        setIsActivated: setIsActivatedSamtBaby
      }
    case 'fluffy':
      return {
        load: loadFluffy,
        loaded: loadedFluffy,
        loadingError: loadingFluffyError,
        setIsActivated: setIsActivatedFluffy
      }
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
    case 'catania':
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
    case 'king-cotton':
      return {
        selectData: selectDataKingCotton,
        selectError: selectErrorKingCotton,
        selectIsActivated: selectIsActivatedKingCotton,
        selectIsLoaded: selectIsLoadedKingCotton,
        selectIsLoading: selectIsLoadingKingCotton
      }
    case 'lisa-premium-uni':
      return {
        selectData: selectDataLisaPremiumUni,
        selectError: selectErrorLisaPremiumUni,
        selectIsActivated: selectIsActivatedLisaPremiumUni,
        selectIsLoaded: selectIsLoadedLisaPremiumUni,
        selectIsLoading: selectIsLoadingLisaPremiumUni
      }
    case 'baby-snuggle-solid':
      return {
        selectData: selectDataBabySnuggle,
        selectError: selectErrorBabySnuggle,
        selectIsActivated: selectIsActivatedBabySnuggle,
        selectIsLoaded: selectIsLoadedBabySnuggle,
        selectIsLoading: selectIsLoadingBabySnuggle
      }
    case 'dolphin-baby':
      return {
        selectData: selectDataDolphinBaby,
        selectError: selectErrorDolphinBaby,
        selectIsActivated: selectIsActivatedDolphinBaby,
        selectIsLoaded: selectIsLoadedDolphinBaby,
        selectIsLoading: selectIsLoadingDolphinBaby
      }
    case 'samt':
      return {
        selectData: selectDataSamt,
        selectError: selectErrorSamt,
        selectIsActivated: selectIsActivatedSamt,
        selectIsLoaded: selectIsLoadedSamt,
        selectIsLoading: selectIsLoadingSamt
      }
    case 'samt-baby':
      return {
        selectData: selectDataSamtBaby,
        selectError: selectErrorSamtBaby,
        selectIsActivated: selectIsActivatedSamtBaby,
        selectIsLoaded: selectIsLoadedSamtBaby,
        selectIsLoading: selectIsLoadingSamtBaby
      }
    case 'fluffy':
      return {
        selectData: selectDataFluffy,
        selectError: selectErrorFluffy,
        selectIsActivated: selectIsActivatedFluffy,
        selectIsLoaded: selectIsLoadedFluffy,
        selectIsLoading: selectIsLoadingFluffy
      }
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
    case 'catania':
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
