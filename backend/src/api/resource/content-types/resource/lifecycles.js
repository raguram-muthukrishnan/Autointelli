module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    
    // Validate file if present
    if (data.file) {
      await validateResourceFile(data.file, strapi);
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    
    // Validate file if being updated
    if (data.file) {
      await validateResourceFile(data.file, strapi);
    }

    // Store the previous published state for comparison in afterUpdate
    if (where && where.id) {
      try {
        const previousResource = await strapi.entityService.findOne(
          'api::resource.resource',
          where.id,
          { fields: ['published'] }
        );
        // Store in params for access in afterUpdate
        event.params._previousPublished = previousResource?.published || false;
        console.log('📝 Stored previous published state:', event.params._previousPublished);
      } catch (error) {
        console.error('❌ Error fetching previous resource state:', error);
        event.params._previousPublished = false;
      }
    }
  },

  async afterCreate(event) {
    const { result } = event;

    console.log('🔔 Resource afterCreate hook triggered');
    console.log('📊 Resource data:', { 
      id: result?.id, 
      title: result?.title, 
      published: result?.published,
      type: typeof result?.published 
    });

    // Only send newsletter if resource is published on creation
    if (result && result.published === true) {
      try {
        console.log('📧 Sending newsletter for newly published resource:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('resource', result);
        console.log(`✅ Newsletter sent successfully for resource: ${result.title}`);
      } catch (error) {
        console.error('❌ Error sending newsletter for resource:', error);
        console.error('Error details:', error.message, error.stack);
      }
    } else {
      console.log('⏭️ Resource created as draft, skipping newsletter');
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    console.log('🔔 Resource afterUpdate hook triggered');
    console.log('📊 Resource data:', { 
      id: result?.id, 
      title: result?.title, 
      currentPublished: result?.published,
      previousPublished: params._previousPublished,
      publishedType: typeof result?.published,
      previousType: typeof params._previousPublished
    });

    // Check if resource was just published (changed from false/undefined to true)
    const wasUnpublished = params._previousPublished === false || params._previousPublished === undefined;
    const isNowPublished = result.published === true;
    const wasJustPublished = wasUnpublished && isNowPublished;
    
    console.log('🔍 Publication check:', { wasUnpublished, isNowPublished, wasJustPublished });
    
    if (wasJustPublished) {
      try {
        console.log('📧 Sending newsletter for newly published resource:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('resource', result);
        console.log(`✅ Newsletter sent successfully for resource: ${result.title}`);
      } catch (error) {
        console.error('❌ Error sending newsletter for resource:', error);
        console.error('Error details:', error.message, error.stack);
      }
    } else if (isNowPublished && params._previousPublished === true) {
      console.log('⏭️ Resource was already published, skipping duplicate newsletter');
    } else if (!isNowPublished) {
      console.log('⏭️ Resource is draft/unpublished, skipping newsletter');
    } else {
      console.log('⏭️ No publication state change detected, skipping newsletter');
    }
  },
};

/**
 * Validates resource file type and size
 * @param {number|object} fileId - File ID or file object
 * @param {object} strapi - Strapi instance
 * @throws {Error} If validation fails
 */
async function validateResourceFile(fileId, strapi) {
  try {
    // Get file details
    let file;
    if (typeof fileId === 'number') {
      file = await strapi.plugins.upload.services.upload.findOne(fileId);
    } else if (typeof fileId === 'object' && fileId.id) {
      file = await strapi.plugins.upload.services.upload.findOne(fileId.id);
    } else {
      // File object already provided
      file = fileId;
    }

    if (!file) {
      throw new Error('File not found');
    }

    // Validate file type (PDF and CSV only)
    const allowedMimeTypes = ['application/pdf', 'text/csv', 'application/vnd.ms-excel'];
    if (!allowedMimeTypes.includes(file.mime)) {
      throw new Error('Only PDF and CSV files are allowed');
    }

    // Validate file size (max 100MB = 100 * 1024 KB)
    const maxSizeKB = 100 * 1024;
    if (file.size > maxSizeKB) {
      throw new Error('File size must not exceed 100MB');
    }
  } catch (error) {
    strapi.log.error('Resource file validation error:', error);
    throw error;
  }
}
