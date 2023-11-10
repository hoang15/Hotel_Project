/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lzirkrg52sqz33g")

  // remove
  collection.schema.removeField("tb1vptvp")

  // remove
  collection.schema.removeField("ah0x4y0g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ncm1usoi",
    "name": "checkInTime",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ywko9cto",
    "name": "checkOutTime",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lzirkrg52sqz33g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tb1vptvp",
    "name": "checkInTime",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ah0x4y0g",
    "name": "checkOutTime",
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

  // remove
  collection.schema.removeField("ncm1usoi")

  // remove
  collection.schema.removeField("ywko9cto")

  return dao.saveCollection(collection)
})
