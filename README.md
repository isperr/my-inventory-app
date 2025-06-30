# My inventory app

This app allows an insight into Guzzi's all of current wool collections.

## How to add new collection within firebase

1. Add new folder **COLLECTION_NAME** to _Storage_
2. Add new collection **COLLECTION_NAME** to _Firestore Database_
   - update _Regeln_ and _Indexe_

## How to add a new collection / changes necessary to add a new collection

1. `components/Homepage/types.ts` - add new collection to `collectionNames`
2. Copy e.g. `modules/catania` (with sub-folders `/home`, `/results`, `/search`) and rename to new **COLLECTION_NAME**

3. Add modules into `utils/store.ts` in order for 2. to work properly

4. Add collection within `modules/utils/home`, `modules/utils/results`, `modules/utils/search` selectors (same name as added within 3.) and rename content within `modules/COLLECTION_NAME` according to store-names

5. expand `components` accordingly

- `AddPage`
  - `components/Form.tsx` - add collection to form
  - `utils/get-slice.ts` - add collection
  - `hooks/use-insert.ts` - expand switch statement to include collection
- `DetailPage`
  - `utils/get-slice.ts` - add collection
- `HomePage`
  - `utils/get-slice.ts` - add collection
  - `index.tsx` - add `<PreviewList collection="COLLECTION_NAME">`
- `ListPage`
  - `utils/get-slice.ts` - add collection
- `SearchPage`
  - `utils/get-slice.ts` - add collection
  - `hooks/use-cumulative-search.ts` - expand to include collection
  - `index.tsx`
    - add `<SearchPreview collection="COLLECTION_NAME" />`
