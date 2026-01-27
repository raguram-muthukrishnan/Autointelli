'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

// Helper function to fetch geolocation from IP using ipapi.co
async function getGeolocation(ipAddress) {
  // Skip geolocation for local/private IPs
  if (!ipAddress || ipAddress === 'Unknown' || 
      ipAddress === '::1' || ipAddress.startsWith('127.') || 
      ipAddress.startsWith('192.168.') || ipAddress.startsWith('10.') ||
      ipAddress.startsWith('172.') || ipAddress.startsWith('::ffff:127.')) {
    console.log(`Local IP detected (${ipAddress}), using test data`);
    return { country: 'Localhost (Testing)', city: 'Local Development' };
  }

  try {
    // Using ipapi.co - Free, HTTPS, 1000 requests/day, commercial use allowed
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
      headers: { 'User-Agent': 'AutoIntelli-Visitor-Tracker' }
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown'
      };
    }
  } catch (error) {
    console.warn('Failed to fetch geolocation from ipapi.co:', error.message);
  }
  
  return { country: 'Unknown', city: 'Unknown' };
}

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
        // Fetch geolocation if not already present
        let updateData = {
          sessionId,
          ipAddress,
          lastVisit: new Date(),
          visitCount: existingVisitor.visitCount + 1,
          pageViews: pageViews || existingVisitor.pageViews
        };

        // Update geolocation if missing
        if (!existingVisitor.country || !existingVisitor.city || 
            existingVisitor.country === 'Unknown' || existingVisitor.city === 'Unknown') {
          const geolocation = await getGeolocation(ipAddress);
          updateData.country = geolocation.country;
          updateData.city = geolocation.city;
        }

        // Update existing visitor
        visitor = await strapi.db.query('api::visitor.visitor').update({
          where: { id: existingVisitor.id },
          data: updateData
        });
      } else {
        // Fetch geolocation data for new visitors
        const geolocation = await getGeolocation(ipAddress);
        
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
            country: geolocation.country,
            city: geolocation.city,
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
      console.error('Error tracking visitor:', error);
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
