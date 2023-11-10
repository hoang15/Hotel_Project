/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hrjd143li562kd2",
    "created": "2023-11-09 06:42:38.147Z",
    "updated": "2023-11-09 06:42:38.147Z",
    "name": "gallery",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1idfp2pu",
        "name": "field",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("hrjd143li562kd2");

  return dao.deleteCollection(collection);
})
