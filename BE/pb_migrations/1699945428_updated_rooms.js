/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttbmtt2jkfzpm3o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oyhrfa5w",
    "name": "typeOfBed",
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

  // remove
  collection.schema.removeField("oyhrfa5w")

  return dao.saveCollection(collection)
})
