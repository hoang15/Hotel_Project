/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttbmtt2jkfzpm3o")

  // remove
  collection.schema.removeField("kkxk9kp9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwlkxbil",
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
  const collection = dao.findCollectionByNameOrId("ttbmtt2jkfzpm3o")

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

  // remove
  collection.schema.removeField("vwlkxbil")

  return dao.saveCollection(collection)
})
