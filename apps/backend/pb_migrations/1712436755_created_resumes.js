/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ci80pejfv22btww",
    "created": "2024-04-06 20:52:35.049Z",
    "updated": "2024-04-06 20:52:35.049Z",
    "name": "resumes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pgevv6vm",
        "name": "resume",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "qghf7wkw",
        "name": "active",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("ci80pejfv22btww");

  return dao.deleteCollection(collection);
})
