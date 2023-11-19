/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lzirkrg52sqz33g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hnb2cv3i",
    "name": "isAgree",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lzirkrg52sqz33g")

  // remove
  collection.schema.removeField("hnb2cv3i")

  return dao.saveCollection(collection)
})
