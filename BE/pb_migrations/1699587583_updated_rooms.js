/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttbmtt2jkfzpm3o")

  // remove
  collection.schema.removeField("tejawpix")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kkxk9kp9",
    "name": "image",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttbmtt2jkfzpm3o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tejawpix",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("kkxk9kp9")

  return dao.saveCollection(collection)
})
