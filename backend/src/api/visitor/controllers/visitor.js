'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::visitor.visitor', ({ strapi }) => ({
  async track(ctx) {
    try {
      const {
        visitorId,
        sessionId,
        userAgent,
        referrer,
        landingPage,
        browser,
        device,
        os,
        country,
        city,
        pageViews
      } = ctx.request.body;

      // Get IP address from request headers
      const forwardedFor = ctx.request.headers['x-forwarded-for'];
      const ipAddress = 
        (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : null) ||
        ctx.request.headers['x-real-ip'] ||
        ctx.request.ip ||
        ctx.request.socket?.remoteAddress ||
        'Unknown';

      // Check if visitor exists
      const existingVisitor = await strapi.db.query('api::visitor.visitor').findOne({
        where: { visitorId }
      });

      let visitor;

      if (existingVisitor) {
        // Update existing visitor
        visitor = await strapi.db.query('api::visitor.visitor').update({
          where: { id: existingVisitor.id },
          data: {
            sessionId,
            ipAddress,
            lastVisit: new Date(),
            visitCount: existingVisitor.visitCount + 1,
            pageViews: pageViews || existingVisitor.pageViews
          }
        });
      } else {
        // Create new visitor
        visitor = await strapi.db.query('api::visitor.visitor').create({
          data: {
            visitorId,
            sessionId,
            ipAddress,
            userAgent,
            referrer,
            landingPage,
            browser,
            device,
            os,
            country,
            city,
            visitCount: 1,
            firstVisit: new Date(),
            lastVisit: new Date(),
            pageViews: pageViews || []
          }
        });
      }

      return ctx.send({
        success: true,
        data: visitor
      });
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async getVisitor(ctx) {
    try {
      const { visitorId } = ctx.params;

      const visitor = await strapi.db.query('api::visitor.visitor').findOne({
        where: { visitorId }
      });

      if (!visitor) {
        return ctx.notFound('Visitor not found');
      }

      return ctx.send({
        success: true,
        data: visitor
      });
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async find(ctx) {
    try {
      const visitors = await strapi.db.query('api::visitor.visitor').findMany({
        orderBy: { lastVisit: 'desc' },
        limit: 100
      });

      const total = await strapi.db.query('api::visitor.visitor').count();

      return ctx.send({
        data: visitors,
        meta: {
          pagination: {
            page: 1,
            pageSize: 100,
            pageCount: Math.ceil(total / 100),
            total
          }
        }
      });
    } catch (error) {
      console.error('Error in find visitors:', error);
      return ctx.send({
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: 100,
            pageCount: 0,
            total: 0
          }
        },
        error: error.message
      });
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const visitor = await strapi.db.query('api::visitor.visitor').findOne({
        where: { id: parseInt(id) }
      });

      if (!visitor) {
        return ctx.notFound('Visitor not found');
      }

      return ctx.send({
        data: visitor
      });
    } catch (error) {
      console.error('Error in findOne visitor:', error);
      ctx.throw(500, error);
    }
  }
}));
