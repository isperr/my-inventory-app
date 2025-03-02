import {
  load as loadReg,
  loaded as loadedReg,
  loadingError as loadingRegError,
  setIsActivated as setIsActivatedReg
} from '../../../modules/catania/results/slice'
import {
  load as loadColor,
  loaded as loadedColor,
  loadingError as loadingColorError,
  setIsActivated as setIsActivatedColor
} from '../../../modules/catania-color/results/slice'
import {
  selectData as selectDataReg,
  selectError as selectErrorReg,
  selectIsActivated as selectIsActivatedReg,
  selectIsLoaded as selectIsLoadedReg,
  selectIsLoading as selectIsLoadingReg
} from '../../../modules/catania/results/selectors'
import {
  selectData as selectDataColor,
  selectError as selectErrorColor,
  selectIsActivated as selectIsActivatedColor,
  selectIsLoaded as selectIsLoadedColor,
  selectIsLoading as selectIsLoadingColor
} from '../../../modules/catania-color/results/selectors'
import {CollectionType} from '../../HomePage/types'

export const getActions = (collection: CollectionType) => {
  if (collection === 'catania-color') {
    return {
      load: loadColor,
      loaded: loadedColor,
      loadingError: loadingColorError,
      setIsActivated: setIsActivatedColor
    }
  }
  return {
    load: loadReg,
    loaded: loadedReg,
    loadingError: loadingRegError,
    setIsActivated: setIsActivatedReg
  }
}

export const getSelectors = (collection: CollectionType) => {
  if (collection === 'catania-color') {
    return {
      selectData: selectDataColor,
      selectError: selectErrorColor,
      selectIsActivated: selectIsActivatedColor,
      selectIsLoaded: selectIsLoadedColor,
      selectIsLoading: selectIsLoadingColor
    }
  }
  return {
    selectData: selectDataReg,
    selectError: selectErrorReg,
    selectIsActivated: selectIsActivatedReg,
    selectIsLoaded: selectIsLoadedReg,
    selectIsLoading: selectIsLoadingReg
  }
}
