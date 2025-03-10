export const collectionNames = {
  catania: 'Schachenmayr Catania',
  'catania-color': 'Schachenmayr Catania Color',
  'cotton-quick': 'Gründl Cotton Quick',
  'cotton-quick-print': 'Gründl Cotton Quick Print',
  'funny-uni': 'Gründl Funny uni',
  samt: 'myboshi SAMT',
  'samt-baby': 'Ayos Samt Baby'
}
export type CollectionNamesType = typeof collectionNames

export type CollectionType = keyof CollectionNamesType
