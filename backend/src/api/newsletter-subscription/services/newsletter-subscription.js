'use strict';

/**
 * newsletter-subscription service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter-subscription.newsletter-subscription', ({ strapi }) => ({
  /**
   * Send newsletter to subscribers
   * @param {string} contentType - 'blog', 'webinar', or 'event'
   * @param {object} item - The content item
   */
  async sendNewsletter(contentType, item) {
    try {
      console.log(`📬 sendNewsletter called for ${contentType}:`, item.title);
      
      // Get all subscribed users - we'll filter categories in JavaScript since it's a JSON field
      const allSubscribers = await strapi.entityService.findMany('api::newsletter-subscription.newsletter-subscription', {
        filters: {
          subscribed: true,
        },
      });

      console.log(`📊 Found ${allSubscribers?.length || 0} total active subscribers`);

      // Filter subscribers who opted into this category or 'all'
      const subscribers = allSubscribers.filter(sub => {
        const categories = Array.isArray(sub.categories) ? sub.categories : [];
        const hasCategory = categories.includes(contentType) || categories.includes('all');
        console.log(`  - ${sub.email}: categories=${JSON.stringify(categories)}, matches=${hasCategory}`);
        return hasCategory;
      });

      console.log(`📊 ${subscribers.length} subscribers match ${contentType} category`);

      if (!subscribers || subscribers.length === 0) {
        console.log(`⚠️ No subscribers found for ${contentType}`);
        return;
      }

      // Prepare email content
      const contentTypeLabel = contentType === 'resource' ? 'Resource' : contentType.charAt(0).toUpperCase() + contentType.slice(1);
      const subject = `New ${contentTypeLabel} Available - ${item.title}`;
      
      // Generate URL to the listing page based on content type
      let listingUrl;
      
      if (contentType === 'blog') {
        listingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/blog`;
      } else if (contentType === 'webinar') {
        listingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/webinars`;
      } else if (contentType === 'event') {
        listingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/events`;
      } else if (contentType === 'resource') {
        listingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/resources`;
      } else if (contentType === 'careers') {
        listingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/careers`;
      } else {
        listingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/${contentType}s`;
      }
      
      // Get the appropriate summary field based on content type
      // Blog uses 'excerpt', Webinar/Event use 'short_description', Resource uses 'description'
      let summary = '';
      if (contentType === 'blog') {
        summary = item.excerpt || '';
      } else if (contentType === 'webinar' || contentType === 'event') {
        summary = item.short_description || '';
      } else if (contentType === 'resource') {
        summary = item.description || '';
      } else {
        // Fallback for other content types
        summary = item.excerpt || item.short_description || item.description || '';
      }
      
      // Ensure we have a summary
      if (!summary) {
        console.warn(`⚠️ No summary found for ${contentType}: ${item.title}`);
        summary = 'No summary available.';
      }
      
      const textContent = `
A new ${contentTypeLabel} is now available.

Title: ${item.title}

Summary: ${summary}

Access the full content using the link below:
${listingUrl}

You are receiving this email because you opted in for Autointelli ${contentTypeLabel} updates. To unsubscribe, please use the link provided.
      `.trim();

      const htmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
  <h2 style="color: #1a1a1a; margin-bottom: 20px;">New ${contentTypeLabel} Published: ${item.title}</h2>
  
  <p style="color: #4a5568; line-height: 1.6;">A new ${contentTypeLabel} is now available.</p>
  
  <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 15px;">${item.title}</h3>
    <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">${summary}</p>
  </div>
  
  <p style="color: #4a5568; line-height: 1.6;">Access the full content using the link below:</p>
  
  <div style="margin: 30px 0; text-align: center;">
    <a href="${listingUrl}" style="display: inline-block; background: #FFD600; color: #000; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 700;">
      View ${contentTypeLabel} →
    </a>
  </div>
  
  <div style="background: #f7fafc; padding: 15px; margin-top: 30px; border-top: 1px solid #e2e8f0;">
    <p style="color: #718096; font-size: 0.85rem; margin: 0;">
      You are receiving this email because you opted in for Autointelli ${contentTypeLabel} updates.
      <br>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe/{{token}}" style="color: #718096; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
</div>
      `.trim();

      // Send emails to all subscribers
      console.log(`📤 Preparing to send ${subscribers.length} emails...`);
      
      const emailPromises = subscribers.map(async (subscriber) => {
        try {
          const personalizedHtml = htmlContent.replace('{{token}}', subscriber.unsubscribe_token);
          
          console.log(`📧 Sending email to ${subscriber.email}...`);
          
          await strapi.plugins['email'].services.email.send({
            to: subscriber.email,
            from: process.env.SMTP_FROM || 'noreply@autointelli.com',
            subject,
            text: textContent,
            html: personalizedHtml,
          });

          console.log(`✅ Newsletter sent to ${subscriber.email}`);
        } catch (error) {
          console.error(`❌ Failed to send newsletter to ${subscriber.email}:`, error);
        }
      });

      await Promise.allSettled(emailPromises);
      console.log(`✅ Newsletter process completed for ${subscribers.length} subscribers for ${contentType}: ${item.title}`);
    } catch (error) {
      console.error('Error sending newsletter:', error);
      throw error;
    }
  },
}));
