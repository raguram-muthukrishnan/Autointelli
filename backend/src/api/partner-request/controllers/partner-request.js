'use strict';

/**
 * partner-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partner-request.partner-request', ({ strapi }) => ({
  async create(ctx) {
    // Create the partner request
    const response = await super.create(ctx);
    
    const request = response.data;
    const attrs = request.attributes || request;
    const { company_name, contact_name, business_email, phone_number, partner_type, about_business } = attrs;

    try {
      // Send email to admin
      await strapi.plugins['email'].services.email.send({
        to: process.env.ADMIN_EMAIL || 'admin@autointelli.com',
        from: process.env.SMTP_FROM || 'noreply@autointelli.com',
        subject: `New Partnership Request from ${company_name}`,
        text: `
A new partnership request has been submitted.

Company Information
• Company Name: ${company_name}
• Contact Person: ${contact_name}
• Business Email: ${business_email}
• Phone Number: ${phone_number || 'Not provided'}
• Partnership Type: ${partner_type}

Business Overview
${about_business}

Submitted On: ${new Date().toLocaleString()}

Please review this request in the Admin Panel.
${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::partner-request.partner-request/${request.id}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Partnership Request from ${company_name}</h2>
            
            <p style="color: #4a5568; margin-bottom: 20px;">A new partnership request has been submitted.</p>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 15px;">Company Information</h3>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Company Name:</strong> ${company_name}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Contact Person:</strong> ${contact_name}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Business Email:</strong> <a href="mailto:${business_email}" style="color: #4a5568;">${business_email}</a></p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Phone Number:</strong> ${phone_number || 'Not provided'}</p>
              <p style="margin: 8px 0; color: #4a5568;">• <strong>Partnership Type:</strong> ${partner_type}</p>
            </div>

            <div style="background: #fff; padding: 20px; border-left: 4px solid #FFD600; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 10px;">Business Overview</h3>
              <p style="color: #4a5568; line-height: 1.6; margin: 0;">${about_business}</p>
            </div>

            <p style="color: #718096; font-size: 0.9rem; margin-top: 30px;">
              <strong>Submitted On:</strong> ${new Date().toLocaleString()}
            </p>
            
            <p style="margin-top: 20px;">
              <a href="${process.env.PUBLIC_URL}/admin/content-manager/collection-types/api::partner-request.partner-request/${request.id}" 
                 style="color: #4a5568; text-decoration: underline;">Please review this request in the Admin Panel.</a>
            </p>
          </div>
        `
      });

      // Send thank you email to partner with Calendly link
      await strapi.plugins['email'].services.email.send({
        to: business_email,
        from: process.env.SMTP_FROM || 'noreply@autointelli.com',
        subject: 'Thank You for Your Partnership Interest – Autointelli',
        text: `
Hi ${contact_name},

Thank you for expressing your interest in partnering with Autointelli. We appreciate the opportunity to learn more about ${company_name} and the value your organization brings.

Our partnerships team is reviewing your request and will respond within 2–3 business days. If you prefer to connect sooner, you may schedule a meeting using the link below:

${process.env.CALENDLY_LINK || 'https://calendly.com/autointelli'}

Best regards,
Autointelli Partnerships Team

This is an automated message. Please do not reply.
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">Thank You for Your Partnership Interest – Autointelli</h2>

            <p style="color: #4a5568; line-height: 1.6;">Hi ${contact_name},</p>
              
            <p style="color: #4a5568; line-height: 1.6;">
              Thank you for expressing your interest in partnering with Autointelli. We appreciate the opportunity to learn more about <strong>${company_name}</strong> and the value your organization brings.
            </p>

            <p style="color: #4a5568; line-height: 1.6;">
              Our partnerships team is reviewing your request and will respond within 2–3 business days. If you prefer to connect sooner, you may schedule a meeting using the link below:
            </p>

            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.CALENDLY_LINK || 'https://calendly.com/autointelli'}" 
                 style="display: inline-block; background: #FFD600; color: #000; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 700;">
                Schedule a Partnership Meeting →
              </a>
            </div>

            <p style="color: #4a5568; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong>Autointelli Partnerships Team</strong>
            </p>

            <div style="background: #f7fafc; padding: 15px; margin-top: 30px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 0.85rem; margin: 0;">
                This is an automated message. Please do not reply.
              </p>
            </div>
          </div>
        `
      });

      strapi.log.info(`Partner request emails sent for: ${business_email}`);
    } catch (error) {
      strapi.log.error('Error sending partner request emails:', error);
      // Don't fail the request if email fails
    }

    return response;
  }
}));
