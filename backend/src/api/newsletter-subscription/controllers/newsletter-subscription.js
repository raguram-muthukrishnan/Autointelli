'use strict';

/**
 * newsletter-subscription controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter-subscription.newsletter-subscription', ({ strapi }) => ({
  // Override default create to handle subscription
  async create(ctx) {
    const { name, email, categories } = ctx.request.body.data || ctx.request.body;

    // Validate required fields
    if (!name || !email) {
      return ctx.badRequest('Name and email are required');
    }

    // Check if email already exists
    const existing = await strapi.entityService.findMany('api::newsletter-subscription.newsletter-subscription', {
      filters: { email },
      limit: 1,
    });

    if (existing && existing.length > 0) {
      // Update existing subscription
      const updated = await strapi.entityService.update(
        'api::newsletter-subscription.newsletter-subscription',
        existing[0].id,
        {
          data: {
            name,
            categories: categories || [],
            subscribed: true,
          },
        }
      );

      return ctx.send({
        data: updated,
        message: 'Subscription updated successfully',
      });
    }

    // Generate unsubscribe token
    const crypto = require('crypto');
    const unsubscribe_token = crypto.randomBytes(32).toString('hex');

    // Create new subscription
    const subscription = await strapi.entityService.create('api::newsletter-subscription.newsletter-subscription', {
      data: {
        name,
        email,
        categories: categories || [],
        subscribed: true,
        unsubscribe_token,
      },
    });

    // Send welcome email (optional)
    try {
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: process.env.SMTP_FROM || 'noreply@autointelli.com',
        subject: 'Welcome to Autointelli Newsletter',
        text: `Hi ${name},

Thank you for subscribing to the Autointelli newsletter. You will now receive curated updates and insights related to ${categories.join(', ')}, delivered directly to your inbox.

We look forward to keeping you informed.

Best regards,
Autointelli Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Welcome to Autointelli Newsletter</h2>
            
            <p style="color: #4a5568; line-height: 1.6;">Hi ${name},</p>
            
            <p style="color: #4a5568; line-height: 1.6;">
              Thank you for subscribing to the Autointelli newsletter. You will now receive curated updates and insights related to <strong>${categories.join(', ')}</strong>, delivered directly to your inbox.
            </p>
            
            <p style="color: #4a5568; line-height: 1.6;">We look forward to keeping you informed.</p>
            
            <p style="color: #4a5568; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong>Autointelli Team</strong>
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    return ctx.send({
      data: subscription,
      message: 'Subscribed successfully',
    });
  },

  // Unsubscribe endpoint
  async unsubscribe(ctx) {
    const { token } = ctx.params;

    if (!token) {
      return ctx.badRequest('Unsubscribe token is required');
    }

    const subscriptions = await strapi.entityService.findMany('api::newsletter-subscription.newsletter-subscription', {
      filters: { unsubscribe_token: token },
      limit: 1,
    });

    if (!subscriptions || subscriptions.length === 0) {
      return ctx.notFound('Subscription not found');
    }

    const updated = await strapi.entityService.update(
      'api::newsletter-subscription.newsletter-subscription',
      subscriptions[0].id,
      {
        data: {
          subscribed: false,
        },
      }
    );

    return ctx.send({
      data: updated,
      message: 'Unsubscribed successfully',
    });
  },
}));
