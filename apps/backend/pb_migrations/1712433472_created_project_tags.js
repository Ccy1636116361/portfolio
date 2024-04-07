/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0x9qmsc395obo0w",
    "created": "2024-04-06 19:57:52.620Z",
    "updated": "2024-04-06 19:57:52.620Z",
    "name": "project_tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5ap087jn",
        "name": "text",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0x9qmsc395obo0w");

  return dao.deleteCollection(collection);
})
