module.exports = {
  async afterCreate(event) {
    const { result } = event;

    console.log('🔔 Event afterCreate hook triggered');
    console.log('Event data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    if (result && result.publishedAt) {
      try {
        console.log('📧 Attempting to send newsletter for event:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('event', result);
        console.log(`✅ Newsletter triggered for new event: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for event:', error);
      }
    } else {
      console.log('⏭️ Event not published yet, skipping newsletter');
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    console.log('🔔 Event afterUpdate hook triggered');
    console.log('Event data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    // Only send newsletter if just published (to avoid duplicate emails on every update)
    const wasJustPublished = result.publishedAt && params.data.publishedAt && !params.data.publishedAt_was;
    
    if (wasJustPublished) {
      try {
        console.log('📧 Attempting to send newsletter for event:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('event', result);
        console.log(`✅ Newsletter triggered for event: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for event:', error);
      }
    } else if (result.publishedAt) {
      console.log('⏭️ Event already published, skipping duplicate newsletter');
    } else {
      console.log('⏭️ Event not published, skipping newsletter');
    }
  },
};
