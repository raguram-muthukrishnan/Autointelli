'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/export/all-visitor-data',
      handler: 'export.exportAllVisitorData',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/export/cta-inquiries',
      handler: 'export.exportCtaInquiries',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/export/partner-requests',
      handler: 'export.exportPartnerRequests',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/export/newsletter-subscriptions',
      handler: 'export.exportNewsletterSubscriptions',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/export/chatbot-interactions',
      handler: 'api::chatbot-interaction.chatbot-interaction.exportCsv',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
