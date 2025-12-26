'use strict';

/**
 * resource-download router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/resource-downloads',
      handler: 'resource-download.create',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for POST
      },
    },
    {
      method: 'GET',
      path: '/resource-downloads',
      handler: 'resource-download.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/resource-downloads/:id',
      handler: 'resource-download.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/resource-downloads/:id',
      handler: 'resource-download.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/resource-downloads/:id',
      handler: 'resource-download.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
