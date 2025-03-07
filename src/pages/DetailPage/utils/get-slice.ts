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
} from '../../../modules/cotton-quick/results/slice'
import {
  selectHasResolveError as selectHasResolveErrorCottonQuick,
  selectIsIdResolved as selectIsIdResolvedCottonQuick,
  selectIsIdResolving as selectIsIdResolvingCottonQuick,
  selectResolveData as selectResolveDataCottonQuick,
  selectIsUpdatingType as selectIsUpdatingTypeCottonQuick
} from '../../../modules/cotton-quick/results/selectors'
// cotton-quick-print
import {
  resolve as resolveCottonQuickPrint,
  resolved as resolvedCottonQuickPrint,
  resolvingError as resolvingCottonQuickPrintError,
  update as updateCottonQuickPrint,
  updated as updatedCottonQuickPrint,
  updateError as updateCottonQuickPrintError
} from '../../../modules/cotton-quick-print/results/slice'
import {
  selectHasResolveError as selectHasResolveErrorCottonQuickPrint,
  selectIsIdResolved as selectIsIdResolvedCottonQuickPrint,
  selectIsIdResolving as selectIsIdResolvingCottonQuickPrint,
  selectResolveData as selectResolveDataCottonQuickPrint,
  selectIsUpdatingType as selectIsUpdatingTypeCottonQuickPrint
} from '../../../modules/cotton-quick-print/results/selectors'
import {CollectionType} from '../../HomePage/types'

export const getResolveActions = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        resolve: resolveCottonQuick,
        resolved: resolvedCottonQuick,
        resolvingError: resolvingCottonQuickError
      }
    case 'cotton-quick-print':
      return {
        resolve: resolveCottonQuickPrint,
        resolved: resolvedCottonQuickPrint,
        resolvingError: resolvingCottonQuickPrintError
      }
    case 'catania-color':
      return {
        resolve: resolveColor,
        resolved: resolvedColor,
        resolvingError: resolvingColorError
      }
    default:
      return {
        resolve: resolveReg,
        resolved: resolvedReg,
        resolvingError: resolvingRegError
      }
  }
}

export const getResolveSelectors = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        selectHasResolveError: selectHasResolveErrorCottonQuick,
        selectIsIdResolved: selectIsIdResolvedCottonQuick,
        selectIsIdResolving: selectIsIdResolvingCottonQuick,
        selectResolveData: selectResolveDataCottonQuick
      }
    case 'cotton-quick-print':
      return {
        selectHasResolveError: selectHasResolveErrorCottonQuickPrint,
        selectIsIdResolved: selectIsIdResolvedCottonQuickPrint,
        selectIsIdResolving: selectIsIdResolvingCottonQuickPrint,
        selectResolveData: selectResolveDataCottonQuickPrint
      }
    case 'catania-color':
      return {
        selectHasResolveError: selectHasResolveErrorColor,
        selectIsIdResolved: selectIsIdResolvedColor,
        selectIsIdResolving: selectIsIdResolvingColor,
        selectResolveData: selectResolveDataColor
      }
    default:
      return {
        selectHasResolveError: selectHasResolveErrorReg,
        selectIsIdResolved: selectIsIdResolvedReg,
        selectIsIdResolving: selectIsIdResolvingReg,
        selectResolveData: selectResolveDataReg
      }
  }
}

export const getUpdateActions = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        update: updateCottonQuick,
        updated: updatedCottonQuick,
        updateError: updateCottonQuickError
      }
    case 'cotton-quick-print':
      return {
        update: updateCottonQuickPrint,
        updated: updatedCottonQuickPrint,
        updateError: updateCottonQuickPrintError
      }
    case 'catania-color':
      return {
        update: updateColor,
        updated: updatedColor,
        updateError: updateColorError
      }
    default:
      return {
        update: updateReg,
        updated: updatedReg,
        updateError: updateRegError
      }
  }
}

export const getUpdateSelectors = (collection: CollectionType) => {
  switch (collection) {
    case 'cotton-quick':
      return {
        selectIsUpdatingType: selectIsUpdatingTypeCottonQuick
      }
    case 'cotton-quick-print':
      return {
        selectIsUpdatingType: selectIsUpdatingTypeCottonQuickPrint
      }
    case 'catania-color':
      return {
        selectIsUpdatingType: selectIsUpdatingTypeColor
      }
    default:
      return {
        selectIsUpdatingType: selectIsUpdatingTypeReg
      }
  }
}
