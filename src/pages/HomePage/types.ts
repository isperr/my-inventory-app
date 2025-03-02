export const collectionNames = {
  catania: 'Schachermayr Catania',
  'catania-color': 'Schachermayr Catania Color'
}
export type CollectionNamesType = typeof collectionNames

export type CollectionType = keyof CollectionNamesType
