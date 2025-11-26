'use strict';

/**
 * resource-download service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::resource-download.resource-download');
