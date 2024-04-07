/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0x9qmsc395obo0w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i0kpp5bf",
    "name": "url",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0x9qmsc395obo0w")

  // remove
  collection.schema.removeField("i0kpp5bf")

  return dao.saveCollection(collection)
})
