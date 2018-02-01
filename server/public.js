'use strict';

const utl = require('../lib/utl');

exports.plugin = {
  name: 'publicContent',
  version: '1.0.0',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/{param*}',
      config: {
        description: 'Return public files.',
        tags: ['public'],
        auth: false,
        cache: {
          expiresIn: utl.oneYear,
          privacy: 'public',
        },
      },
      handler: {
        directory: {
          path: 'public',
          redirectToSlash: true,
          index: false,
        },
      },
    });
  },
};
