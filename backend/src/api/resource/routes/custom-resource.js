'use strict';

/**
 * Custom resource routes
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/resources/:id/download',
      handler: 'resource.download',
      config: {
        auth: false, // Allow public access to download endpoint
        policies: [],
        middlewares: [],
      }
    }
  ]
};
