/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0x9qmsc395obo0w")

  // remove
  collection.schema.removeField("j4v9ndsw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0x9qmsc395obo0w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j4v9ndsw",
    "name": "projects",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "f324fpi4sdrzcm3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
