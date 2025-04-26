// SCHACHENMAYR ----------------------------------------------------------------
// catania
import {insert as cataniaHomeInsert} from '../../../modules/catania/home/slice'
import {insert as cataniaListInsert} from '../../../modules/catania/results/slice'
// catania-color
import {insert as cataniaColorHomeInsert} from '../../../modules/catania-color/home/slice'
import {insert as cataniaColorListInsert} from '../../../modules/catania-color/results/slice'
// GRÜNDL ----------------------------------------------------------------
// cotton-quick
import {insert as cottonQuickInsert} from '../../../modules/cotton-quick/home/slice'
import {insert as cottonQuickListInsert} from '../../../modules/cotton-quick/results/slice'
// cotton-quick-print
import {insert as cottonQuickPrintInsert} from '../../../modules/cotton-quick-print/home/slice'
import {insert as cottonQuickPrintListInsert} from '../../../modules/cotton-quick-print/results/slice'
// funny-uni
import {insert as funnyUniInsert} from '../../../modules/funny-uni/home/slice'
import {insert as funnyUniListInsert} from '../../../modules/funny-uni/results/slice'
// MYBOSHI ----------------------------------------------------------------
// samt
import {insert as samtInsert} from '../../../modules/samt/home/slice'
import {insert as samtListInsert} from '../../../modules/samt/results/slice'
// AYOS ----------------------------------------------------------------
// samt-baby
import {insert as samtBabyInsert} from '../../../modules/samt-baby/home/slice'
import {insert as samtBabyListInsert} from '../../../modules/samt-baby/results/slice'
// HIMALAYA ----------------------------------------------------------------
// dolphin-baby
import {insert as dolphinBabyInsert} from '../../../modules/dolphin-baby/home/slice'
import {insert as dolphinBabyListInsert} from '../../../modules/dolphin-baby/results/slice'
// HOBBII ----------------------------------------------------------------
// baby-snuggle-solid
import {insert as babySnuggleHomeInsert} from '../../../modules/baby-snuggle-solid/home/slice'
import {insert as babySnuggleListInsert} from '../../../modules/baby-snuggle-solid/results/slice'
// ----------------------------------------------------------------
import {CollectionType} from '../../HomePage/types'

export const getAddInserts = (collection: CollectionType) => {
  switch (collection) {
    case 'baby-snuggle-solid':
      return {
        homeInsert: babySnuggleHomeInsert,
        listInsert: babySnuggleListInsert
      }
    case 'dolphin-baby':
      return {
        homeInsert: dolphinBabyInsert,
        listInsert: dolphinBabyListInsert
      }
    case 'samt':
      return {
        homeInsert: samtInsert,
        listInsert: samtListInsert
      }
    case 'samt-baby':
      return {
        homeInsert: samtBabyInsert,
        listInsert: samtBabyListInsert
      }
    case 'funny-uni':
      return {
        homeInsert: funnyUniInsert,
        listInsert: funnyUniListInsert
      }
    case 'cotton-quick':
      return {
        homeInsert: cottonQuickInsert,
        listInsert: cottonQuickListInsert
      }
    case 'cotton-quick-print':
      return {
        homeInsert: cottonQuickPrintInsert,
        listInsert: cottonQuickPrintListInsert
      }
    case 'catania-color':
      return {
        homeInsert: cataniaColorHomeInsert,
        listInsert: cataniaColorListInsert
      }
    case 'catania':
    default:
      return {
        homeInsert: cataniaHomeInsert,
        listInsert: cataniaListInsert
      }
  }
}
