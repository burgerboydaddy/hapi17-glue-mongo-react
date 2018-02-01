'use strict';

const Joi = require('joi');
const MongoModels = require('mongo-models');


class InvalidKey extends MongoModels {
  static create(key, expire) {
    const document = new InvalidKey({
      key,
      expire,
    });
    return this.insertOne(document);
  }

  static findByKey(key) {
    const query = { key };
    return this.findOne(query);
  }
}


InvalidKey.collectionName = 'invalidKeys';


InvalidKey.schema = Joi.object().keys({
  _id: Joi.object(),
  key: Joi.string().required(),
  expire: Joi.date().required(),
});


InvalidKey.indexes = [
  { key: { key: 1 } },
];


module.exports = InvalidKey;
