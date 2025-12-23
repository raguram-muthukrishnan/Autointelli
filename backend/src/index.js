'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // --- AUTO-FIX: Reset Corrupted Admin Views ---
      // This block runs once to fix the white screen "TypeError: reading 'sort'" error
      const fixKey = 'fix_admin_crash_2025_12_23_final';
      const store = strapi.store({ type: 'plugin', name: 'admin', key: 'fixes' });
      const hasRun = await store.get({ key: fixKey });

      if (!hasRun) {
        strapi.log.info('🛠️ Auto-Fix: Checking for corrupted Content Manager configurations...');

        // Delete all content manager configurations from core-store
        // This forces Strapi to regenerate them from the current schema
        const deleted = await strapi.db.query('strapi::core-store').deleteMany({
          where: {
            key: {
              $startsWith: 'plugin_content_manager_configuration_content_types',
            },
          },
        });

        strapi.log.info(`✅ Auto-Fix: Reset ${deleted.count || 0} view configurations to defaults.`);

        // Mark as run so we don't reset views on every restart
        await store.set({ key: fixKey, value: true });
      }
      // ---------------------------------------------

      // Configure Public role permissions
      const publicRole = await strapi.query("plugin::users-permissions.role").findOne({
        where: { type: "public" },
      });

      if (publicRole) {
        const publicPermissions = [
          { action: "plugin::upload.content-api.upload" },
          { action: "api::webinar.webinar.find" },
          { action: "api::webinar.webinar.findOne" },
          { action: "api::webinar.webinar.create" },
          { action: "api::webinar.webinar.update" },
          { action: "api::webinar.webinar.delete" },
          { action: "api::event.event.find" },
          { action: "api::event.event.findOne" },
          { action: "api::event.event.create" },
          { action: "api::event.event.update" },
          { action: "api::event.event.delete" },
          { action: "api::blog.blog.find" },
          { action: "api::blog.blog.findOne" },
          { action: "api::blog.blog.create" },
          { action: "api::blog.blog.update" },
          { action: "api::blog.blog.delete" },
          { action: "api::resource.resource.find" },
          { action: "api::resource.resource.findOne" },
          { action: "api::newsletter-subscription.newsletter-subscription.create" },
          { action: "api::cta-inquiry.cta-inquiry.create" },
          { action: "api::partner-request.partner-request.create" },
          { action: "api::job-application.job-application.create" },
          { action: "api::chatbot-interaction.chatbot-interaction.create" },
          { action: "api::visitor.visitor.create" },
        ];

        for (const perm of publicPermissions) {
          const existing = await strapi.query("plugin::users-permissions.permission").findOne({
            where: {
              action: perm.action,
              role: publicRole.id,
            },
          });

          if (!existing) {
            await strapi.query("plugin::users-permissions.permission").create({
              data: {
                action: perm.action,
                role: publicRole.id,
                enabled: true,
              },
            });
            strapi.log.info(`Enabled permission ${perm.action} for Public role`);
          } else if (!existing.enabled) {
            await strapi.query("plugin::users-permissions.permission").update({
              where: { id: existing.id },
              data: { enabled: true }
            });
            strapi.log.info(`Enabled permission ${perm.action} for Public role`);
          }
        }
      }

      // Configure Authenticated role permissions
      const authenticatedRole = await strapi.query("plugin::users-permissions.role").findOne({
        where: { type: "authenticated" },
      });

      if (authenticatedRole) {
        const authenticatedPermissions = [
          { action: "api::resource.resource.create" },
          { action: "api::resource.resource.update" },
          { action: "api::resource.resource.delete" },
          { action: "api::resource.resource.find" },
          { action: "api::resource.resource.findOne" },
        ];

        for (const perm of authenticatedPermissions) {
          const existing = await strapi.query("plugin::users-permissions.permission").findOne({
            where: {
              action: perm.action,
              role: authenticatedRole.id,
            },
          });

          if (!existing) {
            await strapi.query("plugin::users-permissions.permission").create({
              data: {
                action: perm.action,
                role: authenticatedRole.id,
                enabled: true,
              },
            });
            strapi.log.info(`Enabled permission ${perm.action} for Authenticated role`);
          } else if (!existing.enabled) {
            await strapi.query("plugin::users-permissions.permission").update({
              where: { id: existing.id },
              data: { enabled: true }
            });
            strapi.log.info(`Enabled permission ${perm.action} for Authenticated role`);
          }
        }
      }
    } catch (e) {
      strapi.log.error("Bootstrap permission error:", e);
    }
  },
};

