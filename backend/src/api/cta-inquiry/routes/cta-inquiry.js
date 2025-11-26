'use strict';

/**
 * cta-inquiry router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cta-inquiry.cta-inquiry', {
  config: {
    create: {
      auth: false,
    },
  },
});
