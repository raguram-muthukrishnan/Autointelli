module.exports = {
  async afterCreate(event) {
    const { result } = event;

    console.log('🔔 Job afterCreate hook triggered');
    console.log('Job data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    if (result && result.publishedAt) {
      try {
        console.log('📧 Attempting to send newsletter for job:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('careers', result);
        console.log(`✅ Newsletter triggered for new job: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for job:', error);
      }
    } else {
      console.log('⏭️ Job not published yet, skipping newsletter');
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    console.log('🔔 Job afterUpdate hook triggered');
    console.log('Job data:', { id: result?.id, title: result?.title, publishedAt: result?.publishedAt });

    // Only send newsletter if just published (to avoid duplicate emails on every update)
    const wasJustPublished = result.publishedAt && params.data.publishedAt && !params.data.publishedAt_was;
    
    if (wasJustPublished) {
      try {
        console.log('📧 Attempting to send newsletter for job:', result.title);
        await strapi.service('api::newsletter-subscription.newsletter-subscription').sendNewsletter('careers', result);
        console.log(`✅ Newsletter triggered for job: ${result.title}`);
      } catch (error) {
        console.error('❌ Error triggering newsletter for job:', error);
      }
    } else if (result.publishedAt) {
      console.log('⏭️ Job already published, skipping duplicate newsletter');
    } else {
      console.log('⏭️ Job not published, skipping newsletter');
    }
  },
};
