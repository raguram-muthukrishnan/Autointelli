'use strict';

/**
 * resource controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const fs = require('fs');
const path = require('path');

module.exports = createCoreController('api::resource.resource', ({ strapi }) => ({
  /**
   * Custom download endpoint that atomically increments download count
   * and serves the file with appropriate headers
   */
  async download(ctx) {
    try {
      const { id } = ctx.params;

      // Validate ID
      if (!id) {
        return ctx.badRequest('Resource ID is required');
      }

      // Fetch the resource with file populated
      // In Strapi v5, use findMany with filters for documentId
      let resource;
      try {
        const results = await strapi.entityService.findMany(
          'api::resource.resource',
          {
            filters: { documentId: id },
            populate: ['file']
          }
        );
        
        resource = results && results.length > 0 ? results[0] : null;
      } catch (error) {
        strapi.log.error('Error fetching resource:', error);
        return ctx.notFound('Resource not found');
      }

      // Check if resource exists
      if (!resource) {
        return ctx.notFound('Resource not found');
      }

      // Check if resource is published (optional security check)
      if (!resource.published) {
        return ctx.forbidden('This resource is not available for download');
      }

      // Check if file exists
      // @ts-ignore - file is populated but TypeScript doesn't recognize it
      if (!resource.file) {
        strapi.log.error(`Resource ${id} has no file attached`);
        return ctx.notFound('File not found for this resource');
      }

      // @ts-ignore - file is populated but TypeScript doesn't recognize it
      const file = resource.file;

      // Construct file path - handle both local and uploaded files
      let filePath;
      
      // Check if file has a URL (uploaded file)
      if (file.url) {
        // For local provider, files are in public/uploads
        if (file.provider === 'local') {
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
          filePath = path.join(uploadsDir, file.hash + file.ext);
        } else {
          // For external providers (S3, etc), redirect to the URL
          return ctx.redirect(file.url);
        }
      } else {
        strapi.log.error(`Resource ${id} file has no URL`);
        return ctx.notFound('File URL not found');
      }

      // Check if file exists on disk
      if (!fs.existsSync(filePath)) {
        strapi.log.error(`File not found on disk: ${filePath}`);
        strapi.log.error(`Looking in: ${filePath}`);
        strapi.log.error(`File details:`, JSON.stringify(file, null, 2));
        return ctx.notFound('File not found on server');
      }

      // Atomically increment download count using raw query for true atomicity
      try {
        await strapi.db.query('api::resource.resource').update({
          where: { id },
          data: {
            downloadCount: resource.downloadCount + 1
          }
        });
      } catch (error) {
        strapi.log.error('Error incrementing download count:', error);
        // Continue with download even if count increment fails
      }

      // Set appropriate headers for file download
      ctx.set('Content-Type', file.mime || 'application/octet-stream');
      ctx.set('Content-Disposition', `attachment; filename="${encodeURIComponent(file.name)}"`);
      ctx.set('Content-Length', String(file.size * 1024)); // Strapi stores size in KB, convert to string

      // Stream the file
      ctx.body = fs.createReadStream(filePath);

    } catch (error) {
      strapi.log.error('Unexpected error in download controller:', error);
      return ctx.internalServerError('An error occurred while processing your download');
    }
  }
}));
