'use strict';

const Config = require('../../config');
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Bounce = require('bounce');

class AuthAttempt extends MongoModels {
  static create(ip, email) {
    const document = new AuthAttempt({
      ip,
      email: email.toLowerCase(),
      time: new Date(),
    });
    return this.insertOne(document);
  }

  static async abuseDetected(ip, email) {
    try {
      const authAttemptsConfig = Config.get('/authAttempts');
      const abusiveIpCountQuery = { ip };
      const abusiveIpCount = await this.count(abusiveIpCountQuery);
      const abusiveIpUserCountQuery = {
        ip,
        email: email.toLowerCase(),
      };
      const abusiveIpUserCount = await this.count(abusiveIpUserCountQuery);
      const ipLimitReached = abusiveIpCount >= authAttemptsConfig.forIp;
      const ipUserLimitReached = abusiveIpUserCount >= authAttemptsConfig.forIpAndUser;
      return (ipLimitReached || ipUserLimitReached);
    } catch (error) {
      Bounce.rethrow(error, 'system');
      throw new Error('Unable to process request');
    }
  }
}

AuthAttempt.collectionName = 'authAttempts';

AuthAttempt.schema = Joi.object({
  _id: Joi.object(),
  email: Joi.string().lowercase().required(),
  ip: Joi.string().required(),
  time: Joi.date().required(),
});

AuthAttempt.indexes = [
  { key: { ip: 1, email: 1 } },
  { key: { email: 1 } },
];

module.exports = AuthAttempt;
