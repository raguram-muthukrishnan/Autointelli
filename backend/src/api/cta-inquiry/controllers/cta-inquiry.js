'use strict';

/**
 * cta-inquiry controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cta-inquiry.cta-inquiry', ({ strapi }) => ({
  async create(ctx) {
    // Create the inquiry
    const response = await super.create(ctx);
    
    const inquiry = response.data;
    const attrs = inquiry.attributes || inquiry;
    const { name, email, phone, company, service_requested, message, source_page } = attrs;

    try {
      // Send email to admin
      await strapi.plugins['email'].services.email.send({
        to: process.env.ADMIN_EMAIL || 'admin@autointelli.com',
        from: process.env.SMTP_FROM || 'noreply@autointelli.com',
        subject: `New Inquiry from ${name}`,
        text: `
A new customer inquiry has been received.

Contact Information
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}
• Company: ${company || 'Not provided'}
• Service Requested: ${service_requested || 'Not specified'}
• Source Page: ${source_page || 'Unknown'}

Message
${message}

Submitted On: ${new Date().toLocaleString()}

Please review this inquiry in the Admin Panel.
${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::cta-inquiry.cta-inquiry/${inquiry.id}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Inquiry from ${name}</h2>
            
            <p style="color: #4a5568; margin-bottom: 20px;">A new customer inquiry has been received.</p>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 15px;">Contact Information</h3>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Email:</strong> <a href="mailto:${email}" style="color: #4a5568;">${email}</a></p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Company:</strong> ${company || 'Not provided'}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Service Requested:</strong> ${service_requested || 'Not specified'}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Source Page:</strong> ${source_page || 'Unknown'}</p>
            </div>

            <div style="background: #fff; padding: 20px; border-left: 4px solid #FFD600; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 10px;">Message</h3>
              <p style="color: #4a5568; line-height: 1.6; margin: 0;">${message}</p>
            </div>

            <p style="color: #718096; font-size: 0.9rem; margin-top: 30px;">
              <strong>Submitted On:</strong> ${new Date().toLocaleString()}
            </p>
            
            <p style="margin-top: 20px;">
              <a href="${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::cta-inquiry.cta-inquiry/${inquiry.id}" 
                 style="color: #4a5568; text-decoration: underline;">Please review this inquiry in the Admin Panel.</a>
            </p>
          </div>
        `
      });

      // Send thank you email to user with Calendly link
      await strapi.plugins['email'].services.email.send({
        to: email,
        from: process.env.SMTP_FROM || 'noreply@autointelli.com',
        subject: 'Thank You for Contacting Autointelli',
        text: `
Hi ${name},

Thank you for reaching out to Autointelli. Your inquiry has been received, and our team will respond shortly.

If you would like to schedule a discussion at your convenience, please use the link below:
${process.env.CALENDLY_LINK || 'https://calendly.com/autointelli'}

Your Message
${message}

Best regards,
Autointelli Team

This is an automated message. Please do not reply.
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Thank You for Contacting Autointelli</h2>

            <p style="color: #4a5568; line-height: 1.6;">Hi ${name},</p>
              
            <p style="color: #4a5568; line-height: 1.6;">
              Thank you for reaching out to Autointelli. Your inquiry has been received, and our team will respond shortly.
            </p>

            <p style="color: #4a5568; line-height: 1.6;">
              If you would like to schedule a discussion at your convenience, please use the link below:
            </p>

            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.CALENDLY_LINK || 'https://calendly.com/autointelli'}" 
                 style="display: inline-block; background: #FFD600; color: #000; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 700;">
                Schedule a Meeting →
              </a>
            </div>

            <div style="background: #fff; padding: 20px; border-left: 4px solid #FFD600; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 10px;">Your Message</h3>
              <p style="color: #4a5568; line-height: 1.6; margin: 0;">${message}</p>
            </div>

            <p style="color: #4a5568; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong>Autointelli Team</strong>
            </p>

            <div style="background: #f7fafc; padding: 15px; margin-top: 30px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 0.85rem; margin: 0;">
                This is an automated message. Please do not reply.
              </p>
            </div>
          </div>
        `
      });

      strapi.log.info(`CTA inquiry emails sent for: ${email}`);
    } catch (error) {
      strapi.log.error('Error sending CTA inquiry emails:', error);
      // Don't fail the request if email fails
    }

    return response;
  }
}));
