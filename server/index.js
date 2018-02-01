'use strict';


exports.plugin = {
  name: 'siteRoot',
  version: '1.0.0',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/',
      config: {
        auth: false,
        description: 'Home page for app.',
        tags: ['web'],
      },
      handler(request, h) {
        // return h.response({ message: 'Welcome to the Hapi 17, with Glue, Manifest, and MongoDb native 3.0.x template for API server.' });
        return h.view('home');
      },
    });
  },
};
