/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zcrkv3q3kaal5h6",
    "created": "2024-04-08 15:31:29.820Z",
    "updated": "2024-04-08 15:31:29.820Z",
    "name": "links",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hmgvdgbg",
        "name": "url",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "hlltiwyd",
        "name": "shortcut",
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
  const collection = dao.findCollectionByNameOrId("zcrkv3q3kaal5h6");

  return dao.deleteCollection(collection);
})
