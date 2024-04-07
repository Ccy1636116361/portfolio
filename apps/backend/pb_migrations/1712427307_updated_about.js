/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yas4nyeoxs8rq23")

  // remove
  collection.schema.removeField("s0yszf6y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q3brqcsq",
    "name": "about_text",
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
  const collection = dao.findCollectionByNameOrId("yas4nyeoxs8rq23")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s0yszf6y",
    "name": "about_text",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("q3brqcsq")

  return dao.saveCollection(collection)
})
