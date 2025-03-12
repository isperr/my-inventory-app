import {useSearchDataState} from './use-search-data'

// always change if there are more collections added
const COLLECTION_COUNT = 7

export const useCumulativeState = () => {
  const {
    data: cataniaData,
    hasNoData: hasNoCataniaData,
    isLoaded: isCataniaLoaded,
    isLoading: isCataniaLoading
  } = useSearchDataState('catania')
  const {
    data: cataniaColorData,
    hasNoData: hasNoCataniaColorData,
    isLoaded: isCataniaColorLoaded,
    isLoading: isCataniaColorLoading
  } = useSearchDataState('catania-color')
  const {
    data: cottonQuickData,
    hasNoData: hasNoCottonQuickData,
    isLoaded: isCottonQuickLoaded,
    isLoading: isCottonQuickLoading
  } = useSearchDataState('cotton-quick')
  const {
    data: cottonQuickPrintData,
    hasNoData: hasNoCottonQuickPrintData,
    isLoaded: isCottonQuickPrintLoaded,
    isLoading: isCottonQuickPrintLoading
  } = useSearchDataState('cotton-quick-print')
  const {
    data: funnyUniData,
    hasNoData: hasNoFunnyUniData,
    isLoaded: isFunnyUniLoaded,
    isLoading: isFunnyUniLoading
  } = useSearchDataState('funny-uni')
  const {
    data: samtData,
    hasNoData: hasNoSamtData,
    isLoaded: isSamtLoaded,
    isLoading: isSamtLoading
  } = useSearchDataState('samt')
  const {
    data: samtBabyData,
    hasNoData: hasNoSamtBabyData,
    isLoaded: isSamtBabyLoaded,
    isLoading: isSamtBabyLoading
  } = useSearchDataState('samt-baby')

  return {
    hasNoData:
      hasNoCataniaData &&
      hasNoCataniaColorData &&
      hasNoCottonQuickData &&
      hasNoCottonQuickPrintData &&
      hasNoFunnyUniData &&
      hasNoSamtData &&
      hasNoSamtBabyData,
    isLoaded:
      isCataniaLoaded &&
      isCataniaColorLoaded &&
      isCottonQuickLoaded &&
      isCottonQuickPrintLoaded &&
      isFunnyUniLoaded &&
      isSamtLoaded &&
      isSamtBabyLoaded,
    isLoading:
      isCataniaLoading ||
      isCataniaColorLoading ||
      isCottonQuickLoading ||
      isCottonQuickPrintLoading ||
      isFunnyUniLoading ||
      isSamtLoading ||
      isSamtBabyLoading,
    isInAllCollections:
      cataniaData.length +
        cataniaColorData.length +
        cottonQuickData.length +
        cottonQuickPrintData.length +
        funnyUniData.length +
        samtData.length +
        samtBabyData.length ===
      COLLECTION_COUNT
  }
}
