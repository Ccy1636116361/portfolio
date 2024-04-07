/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f324fpi4sdrzcm3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "go4ebmxq",
    "name": "tags",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0x9qmsc395obo0w",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f324fpi4sdrzcm3")

  // remove
  collection.schema.removeField("go4ebmxq")

  return dao.saveCollection(collection)
})
