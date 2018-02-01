'use strict';


exports.plugin = {
  name: 'aboutPage',
  version: '1.0.0',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/about',
      config: {
        auth: false,
        description: 'About page for app.',
        tags: ['web'],
      },
      handler(request, h) {
        return h.view('about', { title: 'About Page' });
      },
    });
  },
};
