import {useSearchData} from './use-search-data'

// always change if there are more collections added
const COLLECTION_COUNT = 11

export const useCumulativeSearch = () => {
  const {
    data: dataCatania,
    hasNoData: hasNoCataniaData,
    isLoaded: isCataniaLoaded,
    isLoading: isCataniaLoading,
    onLoadData: onLoadCataniaData,
    onReset: onResetCatania
  } = useSearchData('catania')
  const {
    data: dataCataniaColor,
    hasNoData: hasNoCataniaColorData,
    isLoaded: isCataniaColorLoaded,
    isLoading: isCataniaColorLoading,
    onLoadData: onLoadCataniaColorData,
    onReset: onResetCataniaColor
  } = useSearchData('catania-color')
  const {
    data: dataCottonQuick,
    hasNoData: hasNoCottonQuickData,
    isLoaded: isCottonQuickLoaded,
    isLoading: isCottonQuickLoading,
    onLoadData: onLoadCottonQuickData,
    onReset: onResetCottonQuick
  } = useSearchData('cotton-quick')
  const {
    data: dataCottonQuickPrint,
    hasNoData: hasNoCottonQuickPrintData,
    isLoaded: isCottonQuickPrintLoaded,
    isLoading: isCottonQuickPrintLoading,
    onLoadData: onLoadCottonQuickPrintData,
    onReset: onResetCottonQuickPrint
  } = useSearchData('cotton-quick-print')
  const {
    data: dataFunnyUni,
    hasNoData: hasNoFunnyUniData,
    isLoaded: isFunnyUniLoaded,
    isLoading: isFunnyUniLoading,
    onLoadData: onLoadFunnyUniData,
    onReset: onResetFunnyUni
  } = useSearchData('funny-uni')
  const {
    data: dataKingCotton,
    hasNoData: hasNoKingCottonData,
    isLoaded: isKingCottonLoaded,
    isLoading: isKingCottonLoading,
    onLoadData: onLoadKingCottonData,
    onReset: onResetKingCotton
  } = useSearchData('king-cotton')
  const {
    data: dataLisaPremiumUni,
    hasNoData: hasNoLisaPremiumUniData,
    isLoaded: isLisaPremiumUniLoaded,
    isLoading: isLisaPremiumUniLoading,
    onLoadData: onLoadLisaPremiumUniData,
    onReset: onResetLisaPremiumUni
  } = useSearchData('lisa-premium-uni')
  const {
    data: dataSamt,
    hasNoData: hasNoSamtData,
    isLoaded: isSamtLoaded,
    isLoading: isSamtLoading,
    onLoadData: onLoadSamtData,
    onReset: onResetSamt
  } = useSearchData('samt')
  const {
    data: dataSamtBaby,
    hasNoData: hasNoSamtBabyData,
    isLoaded: isSamtBabyLoaded,
    isLoading: isSamtBabyLoading,
    onLoadData: onLoadSamtBabyData,
    onReset: onResetSamtBaby
  } = useSearchData('samt-baby')
  const {
    data: dataDolphinBaby,
    hasNoData: hasNoDolphinBabyData,
    isLoaded: isDolphinBabyLoaded,
    isLoading: isDolphinBabyLoading,
    onLoadData: onLoadDolphinBabyData,
    onReset: onResetDolphinBaby
  } = useSearchData('dolphin-baby')
  const {
    data: dataBabySnuggle,
    hasNoData: hasNoBabySnuggleData,
    isLoaded: isBabySnuggleLoaded,
    isLoading: isBabySnuggleLoading,
    onLoadData: onLoadBabySnuggleData,
    onReset: onResetBabySnuggle
  } = useSearchData('baby-snuggle-solid')

  const state = {
    hasNoData:
      hasNoCataniaData &&
      hasNoCataniaColorData &&
      hasNoCottonQuickData &&
      hasNoCottonQuickPrintData &&
      hasNoFunnyUniData &&
      hasNoKingCottonData &&
      hasNoLisaPremiumUniData &&
      hasNoSamtData &&
      hasNoSamtBabyData &&
      hasNoDolphinBabyData &&
      hasNoBabySnuggleData,
    isLoaded:
      isCataniaLoaded &&
      isCataniaColorLoaded &&
      isCottonQuickLoaded &&
      isCottonQuickPrintLoaded &&
      isFunnyUniLoaded &&
      isKingCottonLoaded &&
      isLisaPremiumUniLoaded &&
      isSamtLoaded &&
      isSamtBabyLoaded &&
      isDolphinBabyLoaded &&
      isBabySnuggleLoaded,
    isLoading:
      isCataniaLoading ||
      isCataniaColorLoading ||
      isCottonQuickLoading ||
      isCottonQuickPrintLoading ||
      isFunnyUniLoading ||
      isKingCottonLoading ||
      isLisaPremiumUniLoading ||
      isSamtLoading ||
      isSamtBabyLoading ||
      isDolphinBabyLoading ||
      isBabySnuggleLoading,
    isInAllCollections:
      dataCatania.length +
        dataCataniaColor.length +
        dataCottonQuick.length +
        dataCottonQuickPrint.length +
        dataFunnyUni.length +
        dataKingCotton.length +
        dataLisaPremiumUni.length +
        dataSamt.length +
        dataSamtBaby.length +
        dataDolphinBaby.length +
        dataBabySnuggle.length ===
      COLLECTION_COUNT
  }

  const resetSearchStates = () => {
    // reset all search-states
    onResetCatania()
    onResetCataniaColor()
    onResetCottonQuick()
    onResetCottonQuickPrint()
    onResetFunnyUni()
    onResetKingCotton()
    onResetLisaPremiumUni()
    onResetSamt()
    onResetSamtBaby()
    onResetDolphinBaby()
    onResetBabySnuggle()
  }

  const handleSearchAll = async (data: {
    isColorSearch: boolean
    num: number
  }) => {
    await Promise.all([
      onLoadCataniaData(data),
      onLoadCataniaColorData(data),
      onLoadCottonQuickData(data),
      onLoadCottonQuickPrintData(data),
      onLoadFunnyUniData(data),
      onLoadKingCottonData(data),
      onLoadLisaPremiumUniData(data),
      onLoadSamtData(data),
      onLoadSamtBabyData(data),
      onLoadDolphinBabyData(data),
      onLoadBabySnuggleData(data)
    ])
  }

  return {...state, handleSearchAll, resetSearchStates}
}
