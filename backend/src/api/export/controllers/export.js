'use strict';

/**
 * Export controller
 * Handles CSV exports for all visitor data
 */

module.exports = {
  /**
   * Export all visitor data (CTA inquiries, chatbot interactions, partner requests, newsletter subscriptions)
   */
  async exportAllVisitorData(ctx) {
    try {
      const data = {};

      // Fetch CTA Inquiries
      data.ctaInquiries = await strapi.entityService.findMany('api::cta-inquiry.cta-inquiry', {
        fields: ['name', 'email', 'phone', 'company', 'service_requested', 'message', 'source_page', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      // Fetch Chatbot Interactions
      data.chatbotInteractions = await strapi.entityService.findMany('api::chatbot-interaction.chatbot-interaction', {
        fields: ['email', 'session_id', 'source_page', 'first_message', 'total_messages', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      // Fetch Partner Requests
      data.partnerRequests = await strapi.entityService.findMany('api::partner-request.partner-request', {
        fields: ['company_name', 'contact_name', 'business_email', 'phone_number', 'partner_type', 'about_business', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      // Fetch Newsletter Subscriptions
      data.newsletterSubscriptions = await strapi.entityService.findMany('api::newsletter-subscription.newsletter-subscription', {
        fields: ['email', 'status', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      // Build comprehensive CSV
      const csvRows = [];

      // Headers
      csvRows.push('Type,ID,Email,Name,Phone,Company,Message/Details,Source/Status,Date');

      // Add CTA Inquiries
      data.ctaInquiries.forEach(entry => {
        csvRows.push([
          'CTA Inquiry',
          entry.id,
          `"${entry.email || ''}"`,
          `"${entry.name || ''}"`,
          `"${entry.phone || ''}"`,
          `"${entry.company || ''}"`,
          `"${(entry.message || '').replace(/"/g, '""')}"`,
          `"${entry.source_page || ''}"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      // Add Chatbot Interactions
      data.chatbotInteractions.forEach(entry => {
        csvRows.push([
          'Chatbot Interaction',
          entry.id,
          `"${entry.email || ''}"`,
          `"Session: ${entry.session_id || ''}"`,
          '',
          '',
          `"${(entry.first_message || '').replace(/"/g, '""')}"`,
          `"${entry.source_page || ''} (${entry.total_messages} msgs)"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      // Add Partner Requests
      data.partnerRequests.forEach(entry => {
        csvRows.push([
          'Partner Request',
          entry.id,
          `"${entry.business_email || ''}"`,
          `"${entry.contact_name || ''}"`,
          `"${entry.phone_number || ''}"`,
          `"${entry.company_name || ''}"`,
          `"${(entry.about_business || '').replace(/"/g, '""')}"`,
          `"${entry.partner_type || ''}"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      // Add Newsletter Subscriptions
      data.newsletterSubscriptions.forEach(entry => {
        csvRows.push([
          'Newsletter',
          entry.id,
          `"${entry.email || ''}"`,
          '',
          '',
          '',
          '',
          `"${entry.status || ''}"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      const csv = csvRows.join('\n');

      // Set response headers for CSV download
      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', `attachment; filename="all-visitor-data-${Date.now()}.csv"`);
      ctx.body = csv;
    } catch (error) {
      console.error('Error exporting visitor data:', error);
      ctx.throw(500, 'Failed to export visitor data');
    }
  },

  /**
   * Export CTA Inquiries only
   */
  async exportCtaInquiries(ctx) {
    try {
      const entries = await strapi.entityService.findMany('api::cta-inquiry.cta-inquiry', {
        fields: ['name', 'email', 'phone', 'company', 'service_requested', 'message', 'source_page', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service Requested', 'Message', 'Source Page', 'Date'];
      const csvRows = [headers.join(',')];

      entries.forEach(entry => {
        csvRows.push([
          entry.id,
          `"${entry.name || ''}"`,
          `"${entry.email || ''}"`,
          `"${entry.phone || ''}"`,
          `"${entry.company || ''}"`,
          `"${entry.service_requested || ''}"`,
          `"${(entry.message || '').replace(/"/g, '""')}"`,
          `"${entry.source_page || ''}"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      const csv = csvRows.join('\n');

      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', `attachment; filename="cta-inquiries-${Date.now()}.csv"`);
      ctx.body = csv;
    } catch (error) {
      console.error('Error exporting CTA inquiries:', error);
      ctx.throw(500, 'Failed to export CTA inquiries');
    }
  },

  /**
   * Export Partner Requests only
   */
  async exportPartnerRequests(ctx) {
    try {
      const entries = await strapi.entityService.findMany('api::partner-request.partner-request', {
        fields: ['company_name', 'contact_name', 'business_email', 'phone_number', 'partner_type', 'about_business', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      const headers = ['ID', 'Company Name', 'Contact Name', 'Email', 'Phone', 'Partner Type', 'About Business', 'Date'];
      const csvRows = [headers.join(',')];

      entries.forEach(entry => {
        csvRows.push([
          entry.id,
          `"${entry.company_name || ''}"`,
          `"${entry.contact_name || ''}"`,
          `"${entry.business_email || ''}"`,
          `"${entry.phone_number || ''}"`,
          `"${entry.partner_type || ''}"`,
          `"${(entry.about_business || '').replace(/"/g, '""')}"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      const csv = csvRows.join('\n');

      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', `attachment; filename="partner-requests-${Date.now()}.csv"`);
      ctx.body = csv;
    } catch (error) {
      console.error('Error exporting partner requests:', error);
      ctx.throw(500, 'Failed to export partner requests');
    }
  },

  /**
   * Export Newsletter Subscriptions only
   */
  async exportNewsletterSubscriptions(ctx) {
    try {
      const entries = await strapi.entityService.findMany('api::newsletter-subscription.newsletter-subscription', {
        fields: ['email', 'status', 'createdAt'],
        sort: { createdAt: 'desc' },
        limit: -1,
      });

      const headers = ['ID', 'Email', 'Status', 'Date'];
      const csvRows = [headers.join(',')];

      entries.forEach(entry => {
        csvRows.push([
          entry.id,
          `"${entry.email || ''}"`,
          `"${entry.status || ''}"`,
          `"${new Date(entry.createdAt).toISOString()}"`
        ].join(','));
      });

      const csv = csvRows.join('\n');

      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', `attachment; filename="newsletter-subscriptions-${Date.now()}.csv"`);
      ctx.body = csv;
    } catch (error) {
      console.error('Error exporting newsletter subscriptions:', error);
      ctx.throw(500, 'Failed to export newsletter subscriptions');
    }
  },
};
