// catania
import {
  resolve as resolveReg,
  resolved as resolvedReg,
  resolvingError as resolvingRegError,
  update as updateReg,
  updated as updatedReg,
  updateError as updateRegError
} from '../../../modules/catania/results/slice'
import {
  selectHasResolveError as selectHasResolveErrorReg,
  selectIsIdResolved as selectIsIdResolvedReg,
  selectIsIdResolving as selectIsIdResolvingReg,
  selectResolveData as selectResolveDataReg,
  selectIsUpdatingType as selectIsUpdatingTypeReg
} from '../../../modules/catania/results/selectors'
// catania-color
import {
  resolve as resolveColor,
  resolved as resolvedColor,
  resolvingError as resolvingColorError,
  update as updateColor,
  updated as updatedColor,
  updateError as updateColorError
} from '../../../modules/catania-color/results/slice'
import {
  selectHasResolveError as selectHasResolveErrorColor,
  selectIsIdResolved as selectIsIdResolvedColor,
  selectIsIdResolving as selectIsIdResolvingColor,
  selectResolveData as selectResolveDataColor,
  selectIsUpdatingType as selectIsUpdatingTypeColor
} from '../../../modules/catania-color/results/selectors'
// cotton-quick
import {
  resolve as resolveCottonQuick,
  resolved as resolvedCottonQuick,
  resolvingError as resolvingCottonQuickError,
  update as updateCottonQuick,
  updated as updatedCottonQuick,
  updateError as updateCottonQuickError
} from '../../../modules/catania-color/results/slice'
import {
  selectHasResolveError as selectHasResolveErrorCottonQuick,
  selectIsIdResolved as selectIsIdResolvedCottonQuick,
  selectIsIdResolving as selectIsIdResolvingCottonQuick,
  selectResolveData as selectResolveDataCottonQuick,
  selectIsUpdatingType as selectIsUpdatingTypeCottonQuick
} from '../../../modules/catania-color/results/selectors'
import {CollectionType} from '../../HomePage/types'

export const getResolveActions = (collection: CollectionType) => {
  if (collection === 'cotton-quick') {
    return {
      resolve: resolveCottonQuick,
      resolved: resolvedCottonQuick,
      resolvingError: resolvingCottonQuickError
    }
  }
  if (collection === 'catania-color') {
    return {
      resolve: resolveColor,
      resolved: resolvedColor,
      resolvingError: resolvingColorError
    }
  }
  return {
    resolve: resolveReg,
    resolved: resolvedReg,
    resolvingError: resolvingRegError
  }
}

export const getResolveSelectors = (collection: CollectionType) => {
  if (collection === 'cotton-quick') {
    return {
      selectHasResolveError: selectHasResolveErrorCottonQuick,
      selectIsIdResolved: selectIsIdResolvedCottonQuick,
      selectIsIdResolving: selectIsIdResolvingCottonQuick,
      selectResolveData: selectResolveDataCottonQuick
    }
  }
  if (collection === 'catania-color') {
    return {
      selectHasResolveError: selectHasResolveErrorColor,
      selectIsIdResolved: selectIsIdResolvedColor,
      selectIsIdResolving: selectIsIdResolvingColor,
      selectResolveData: selectResolveDataColor
    }
  }
  return {
    selectHasResolveError: selectHasResolveErrorReg,
    selectIsIdResolved: selectIsIdResolvedReg,
    selectIsIdResolving: selectIsIdResolvingReg,
    selectResolveData: selectResolveDataReg
  }
}

export const getUpdateActions = (collection: CollectionType) => {
  if (collection === 'cotton-quick') {
    return {
      update: updateCottonQuick,
      updated: updatedCottonQuick,
      updateError: updateCottonQuickError
    }
  }
  if (collection === 'catania-color') {
    return {
      update: updateColor,
      updated: updatedColor,
      updateError: updateColorError
    }
  }
  return {
    update: updateReg,
    updated: updatedReg,
    updateError: updateRegError
  }
}

export const getUpdateSelectors = (collection: CollectionType) => {
  if (collection === 'cotton-quick') {
    return {
      selectIsUpdatingType: selectIsUpdatingTypeCottonQuick
    }
  }
  if (collection === 'catania-color') {
    return {
      selectIsUpdatingType: selectIsUpdatingTypeColor
    }
  }
  return {
    selectIsUpdatingType: selectIsUpdatingTypeReg
  }
}
