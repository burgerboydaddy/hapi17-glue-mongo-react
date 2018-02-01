'use strict';

const Confidence = require('confidence');
const Path = require('path');
const Config = require('./config.js');

require('babel-core/register')({
  presets: ['react', 'env'],
});

const criteria = {
  env: process.env.NODE_ENV,
};

/* $lab:coverage:off$ */
process.env.CACHE_EXPIRES_IN = Config.get('/cacheOptions/expiresIn') || 86400000;
/* $lab:coverage:on$ */
const manifest = {
  $meta: 'This file defines the API server.',
  server: Config.get('/serverOptions'),
  register: {
    plugins: [
      {
        plugin: 'hapi-auth-basic',
      },
      {
        plugin: 'hapi-auth-jwt2',
      },
      {
        plugin: 'hapi-mongo-models',
        options: {
          mongodb: {
            connection: {
              uri: process.env.DB_CONNECTION,
              db: process.env.DB_NAME,
            },
            options: {
              wtimeout: 0,
              poolSize: 100,
            },
          },
          models: [
            Path.resolve(__dirname, 'server/models/invalidKey'),
            Path.resolve(__dirname, 'server/models/auth-attempt'),
          ],
          autoIndex: false,
        },
      },
      {
        plugin: require('good'),
        options: Config.get('/goodOptions'),
      },
      {
        plugin: 'inert',
      },
      {
        plugin: 'vision',
      },
      {
        plugin: './server/auth',
      },
      {
        plugin: './server/public',
      },
      {
        plugin: './server/health',
      },
      {
        plugin: './server/index',
      },
      {
        plugin: './server/web/about',
      },
      {
        plugin: './server/api/protected',
      },
      {
        plugin: './server/api/emulateLogin',
      },
    ],
  },
};


const store = new Confidence.Store(manifest);

exports.get = function (key) {
  return store.get(key, criteria);
};

/* $lab:coverage:off$ */
exports.meta = function (key) {
  return store.meta(key, criteria);
};
/* $lab:coverage:on$ */
