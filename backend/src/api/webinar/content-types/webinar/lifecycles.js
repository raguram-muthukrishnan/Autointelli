module.exports = {
  async afterCreate(event) {
    const { result } = event;

    console.log('🔔 Webinar afterCreate hook triggered');
    console.log('Webinar data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    if (result && result.publishedAt) {
      try {
        console.log('📧 Attempting to send newsletter for webinar:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('webinar', result);
        console.log(`✅ Newsletter triggered for new webinar: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for webinar:', error);
      }
    } else {
      console.log('⏭️ Webinar not published yet, skipping newsletter');
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    console.log('🔔 Webinar afterUpdate hook triggered');
    console.log('Webinar data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    // Only send newsletter if just published (to avoid duplicate emails on every update)
    const wasJustPublished = result.publishedAt && params.data.publishedAt && !params.data.publishedAt_was;
    
    if (wasJustPublished) {
      try {
        console.log('📧 Attempting to send newsletter for webinar:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('webinar', result);
        console.log(`✅ Newsletter triggered for webinar: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for webinar:', error);
      }
    } else if (result.publishedAt) {
      console.log('⏭️ Webinar already published, skipping duplicate newsletter');
    } else {
      console.log('⏭️ Webinar not published, skipping newsletter');
    }
  },
};
