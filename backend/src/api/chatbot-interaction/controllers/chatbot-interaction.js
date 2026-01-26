'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::chatbot-interaction.chatbot-interaction', ({ strapi }) => ({
  /**
   * Export chatbot interactions to CSV
   */
  async exportCsv(ctx) {
    try {
      // Fetch all chatbot interactions
      const entries = await strapi.entityService.findMany(
        'api::chatbot-interaction.chatbot-interaction',
        {
          fields: ['email', 'session_id', 'source_page', 'first_message', 'total_messages', 'createdAt'],
          sort: { createdAt: 'desc' },
          limit: -1, // Get all records
        }
      );

      // Convert to CSV format
      const headers = ['ID', 'Email', 'Session ID', 'Source Page', 'First Message', 'Total Messages', 'Date', 'Conversation History'];
      const csvRows = [headers.join(',')];

      entries.forEach(entry => {
        const row = [
          entry.id,
          `"${entry.email || ''}"`,
          `"${entry.session_id || ''}"`,
          `"${entry.source_page || ''}"`,
          `"${(entry.first_message || '').replace(/"/g, '""')}"`,
          entry.total_messages || 0,
          `"${new Date(entry.createdAt).toISOString()}"`,
          `"${JSON.stringify(entry.conversation_history || []).replace(/"/g, '""')}"`,
        ];
        csvRows.push(row.join(','));
      });

      const csv = csvRows.join('\n');

      // Set response headers for CSV download
      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', `attachment; filename="chatbot-interactions-${Date.now()}.csv"`);
      ctx.body = csv;
    } catch (error) {
      console.error('Error exporting chatbot interactions:', error);
      ctx.throw(500, 'Failed to export chatbot interactions');
    }
  },
}));
