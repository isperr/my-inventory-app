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
import {
  load as loadFunnyUni,
  loaded as loadedFunnyUni,
  loadingError as loadingFunnyUniError,
  selectData as selectDataFunnyUni,
  selectError as selectErrorFunnyUni,
  selectIsLoaded as selectIsLoadedFunnyUni,
  selectIsLoading as selectIsLoadingFunnyUni
} from '../../../modules/funny-uni/search/slice'
import {resolved as resolvedFunnyUni} from '../../../modules/funny-uni/results/slice'

// MYBOSHI
import {
  load as loadSamt,
  loaded as loadedSamt,
  loadingError as loadingSamtError,
  selectData as selectDataSamt,
  selectError as selectErrorSamt,
  selectIsLoaded as selectIsLoadedSamt,
  selectIsLoading as selectIsLoadingSamt
} from '../../../modules/samt/search/slice'
import {resolved as resolvedSamt} from '../../../modules/samt/results/slice'
import {
  reset as myboshiAddReset,
  setIsbnOrColor as myboshiAddSetIsbnOrColor
} from '../../../modules/myboshi/add/slice'

// AYOS
import {
  load as loadSamtBaby,
  loaded as loadedSamtBaby,
  loadingError as loadingSamtBabyError,
  selectData as selectDataSamtBaby,
  selectError as selectErrorSamtBaby,
  selectIsLoaded as selectIsLoadedSamtBaby,
  selectIsLoading as selectIsLoadingSamtBaby
} from '../../../modules/samt-baby/search/slice'
import {resolved as resolvedSamtBaby} from '../../../modules/samt-baby/results/slice'
import {
  reset as ayosAddReset,
  setIsbnOrColor as ayosAddSetIsbnOrColor
} from '../../../modules/ayos/add/slice'

import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  switch (collection) {
    case 'samt':
      return {
        load: loadSamt,
        loaded: loadedSamt,
        loadingError: loadingSamtError,
        resolved: resolvedSamt
      }
    case 'samt-baby':
      return {
        load: loadSamtBaby,
        loaded: loadedSamtBaby,
        loadingError: loadingSamtBabyError,
        resolved: resolvedSamtBaby
      }
    case 'funny-uni':
      return {
        load: loadFunnyUni,
        loaded: loadedFunnyUni,
        loadingError: loadingFunnyUniError,
        resolved: resolvedFunnyUni
      }
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
    case 'funny-uni':
      return {
        reset: gruendlAddReset,
        setIsbnOrColor: gruendlAddSetIsbnOrColor
      }
    case 'samt':
      return {
        reset: myboshiAddReset,
        setIsbnOrColor: myboshiAddSetIsbnOrColor
      }
    case 'samt-baby':
      return {
        reset: ayosAddReset,
        setIsbnOrColor: ayosAddSetIsbnOrColor
      }
    default:
      return {
        reset: schachenmayrAddReset,
        setIsbnOrColor: schachenmayrAddSetIsbnOrColor
      }
  }
}
