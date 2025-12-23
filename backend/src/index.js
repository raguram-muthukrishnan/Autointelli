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
      // --- AUTO-FIX: Ensure proper Content Manager configuration ---
      const fixKey = 'ensure_blog_config_2025_12_24';
      const store = strapi.store({ type: 'plugin', name: 'admin', key: 'fixes' });
      const hasRun = await store.get({ key: fixKey });

      if (!hasRun) {
        strapi.log.info('🛠️ Auto-Fix: Ensuring blog Content Manager configuration has default sort...');

        // Check blog configuration
        const configStore = strapi.store({ type: 'plugin', name: 'content_manager' });
        const blogConfig = await configStore.get({ key: 'content_types::api::blog.blog' });

        if (!blogConfig || !blogConfig.settings || !blogConfig.settings.defaultSortBy) {
          strapi.log.info('📝 Creating proper blog configuration with default sort...');
          
          await configStore.set({
            key: 'content_types::api::blog.blog',
            value: {
              uid: 'api::blog.blog',
              settings: {
                bulkable: true,
                filterable: true,
                searchable: true,
                pageSize: 10,
                mainField: 'title',
                defaultSortBy: 'title',
                defaultSortOrder: 'ASC'
              },
              metadatas: {
                id: { edit: {}, list: { label: 'id', searchable: true, sortable: true } },
                title: { edit: { label: 'Title', description: '', placeholder: '', visible: true, editable: true }, list: { label: 'Title', searchable: true, sortable: true } },
                slug: { edit: { label: 'Slug', description: '', placeholder: '', visible: true, editable: true }, list: { label: 'Slug', searchable: true, sortable: true } },
                category: { edit: { label: 'Category', description: '', placeholder: '', visible: true, editable: true }, list: { label: 'Category', searchable: true, sortable: true } },
                date: { edit: { label: 'Date', description: '', placeholder: '', visible: true, editable: true }, list: { label: 'Date', searchable: true, sortable: true } }
              },
              layouts: {
                list: ['id', 'title', 'slug', 'date'],
                edit: [[{ name: 'title', size: 6 }, { name: 'slug', size: 6 }], [{ name: 'category', size: 6 }, { name: 'date', size: 6 }], [{ name: 'excerpt', size: 12 }], [{ name: 'description', size: 12 }], [{ name: 'image', size: 6 }], [{ name: 'featured', size: 4 }, { name: 'published', size: 4 }]]
              }
            }
          });
          
          strapi.log.info('✅ Blog configuration created successfully');
        }

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

