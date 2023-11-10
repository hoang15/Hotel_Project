/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hrjd143li562kd2")

  // remove
  collection.schema.removeField("1idfp2pu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yhfbydu4",
    "name": "image",
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
  const collection = dao.findCollectionByNameOrId("hrjd143li562kd2")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("yhfbydu4")

  return dao.saveCollection(collection)
})
