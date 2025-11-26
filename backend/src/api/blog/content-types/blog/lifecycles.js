module.exports = {
  async afterCreate(event) {
    const { result } = event;

    console.log('🔔 Blog afterCreate hook triggered');
    console.log('Blog data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    // Check if blog was published on creation
    if (result && result.publishedAt) {
      try {
        console.log('📧 Attempting to send newsletter for blog:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('blog', result);
        console.log(`✅ Newsletter triggered for new blog: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for blog:', error);
      }
    } else {
      console.log('⏭️ Blog not published yet, skipping newsletter');
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    console.log('🔔 Blog afterUpdate hook triggered');
    console.log('Blog data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    // Only send newsletter if just published (to avoid duplicate emails on every update)
    const wasJustPublished = result.publishedAt && params.data.publishedAt && !params.data.publishedAt_was;
    
    if (wasJustPublished) {
      try {
        console.log('📧 Attempting to send newsletter for blog:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('blog', result);
        console.log(`✅ Newsletter triggered for blog: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for blog:', error);
      }
    } else if (result.publishedAt) {
      console.log('⏭️ Blog already published, skipping duplicate newsletter');
    } else {
      console.log('⏭️ Blog not published, skipping newsletter');
    }
  },
};
