'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // Configure Public role permissions
      const publicRole = await strapi.query("plugin::users-permissions.role").findOne({
        where: { type: "public" },
      });

      if (publicRole) {
        const publicPermissions = [
          { action: "plugin::upload.content-api.upload" },
          { action: "api::webinar.webinar.create" },
          { action: "api::webinar.webinar.update" },
          { action: "api::webinar.webinar.delete" },
          { action: "api::event.event.create" },
          { action: "api::event.event.update" },
          { action: "api::event.event.delete" },
          { action: "api::blog.blog.create" },
          { action: "api::blog.blog.update" },
          { action: "api::blog.blog.delete" },
          { action: "api::resource.resource.find" },
          { action: "api::resource.resource.findOne" },
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
