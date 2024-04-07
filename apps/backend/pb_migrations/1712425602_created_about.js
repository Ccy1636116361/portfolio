/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yas4nyeoxs8rq23",
    "created": "2024-04-06 17:46:42.228Z",
    "updated": "2024-04-06 17:46:42.228Z",
    "name": "about",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("yas4nyeoxs8rq23");

  return dao.deleteCollection(collection);
})
