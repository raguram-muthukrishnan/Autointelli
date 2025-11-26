'use strict';

/**
 * job-application controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::job-application.job-application', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body.data || ctx.request.body;

    // Validate required fields
    if (!data.full_name || !data.email || !data.phone || !data.job_title) {
      return ctx.badRequest('Missing required fields');
    }

    try {
      // Create the application
      const application = await strapi.entityService.create('api::job-application.job-application', {
        data: {
          ...data,
          status: 'New',
        },
      });

      // Send thank you email to applicant
      try {
        await strapi.plugins['email'].services.email.send({
          to: data.email,
          from: process.env.SMTP_FROM || 'careers@autointelli.com',
          subject: 'Application Received – Autointelli',
          text: `Dear ${data.full_name},

Thank you for applying for the position of ${data.job_title} at Autointelli. Your application has been received and shared with our HR team for evaluation. If your profile aligns with our requirements, we will contact you to discuss the next steps.

HR Contact
Email: careers@autointelli.com
Phone: +91 44 2254 1017

For any queries, feel free to reach out to our HR department.

Best regards,
Autointelli HR Team`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">Application Received – Autointelli</h2>
              
              <p style="color: #4a5568; line-height: 1.6;">Dear ${data.full_name},</p>
              
              <p style="color: #4a5568; line-height: 1.6;">
                Thank you for applying for the position of <strong>${data.job_title}</strong> at Autointelli. Your application has been received and shared with our HR team for evaluation. If your profile aligns with our requirements, we will contact you to discuss the next steps.
              </p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 15px;">HR Contact</h3>
                <p style="margin: 8px 0; color: #4a5568;"><strong>Email:</strong> careers@autointelli.com</p>
                <p style="margin: 8px 0; color: #4a5568;"><strong>Phone:</strong> +91 44 2254 1017</p>
              </div>
              
              <p style="color: #4a5568; line-height: 1.6;">For any queries, feel free to reach out to our HR department.</p>
              
              <p style="color: #4a5568; line-height: 1.6; margin-top: 30px;">
                Best regards,<br>
                <strong>Autointelli HR Team</strong>
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send applicant email:', emailError);
      }

      // Send notification email to admin
      try {
        await strapi.plugins['email'].services.email.send({
          to: process.env.ADMIN_EMAIL || 'careers@autointelli.com',
          from: process.env.SMTP_FROM || 'noreply@autointelli.com',
          subject: `New Job Application – ${data.job_title}`,
          text: `A new job application has been submitted for the ${data.job_title} position.

Applicant Information
• Full Name: ${data.full_name}
• Email: ${data.email}
• Phone: ${data.phone}
${data.years_of_experience ? `• Experience: ${data.years_of_experience} years\n` : ''}${data.current_company ? `• Current Company: ${data.current_company}\n` : ''}
Please review the complete application in the Admin Dashboard.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Job Application – ${data.job_title}</h2>
              
              <p style="color: #4a5568; margin-bottom: 20px;">A new job application has been submitted for the <strong>${data.job_title}</strong> position.</p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 15px;">Applicant Information</h3>
                <p style="margin: 8px 0; color: #4a5568;">• <strong>Full Name:</strong> ${data.full_name}</p>
                <p style="margin: 8px 0; color: #4a5568;">• <strong>Email:</strong> ${data.email}</p>
                <p style="margin: 8px 0; color: #4a5568;">• <strong>Phone:</strong> ${data.phone}</p>
                ${data.years_of_experience ? `<p style="margin: 8px 0; color: #4a5568;">• <strong>Experience:</strong> ${data.years_of_experience} years</p>` : ''}
                ${data.current_company ? `<p style="margin: 8px 0; color: #4a5568;">• <strong>Current Company:</strong> ${data.current_company}</p>` : ''}
              </div>
              
              <p style="color: #4a5568; line-height: 1.6;">Please review the complete application in the Admin Dashboard.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send admin notification:', emailError);
      }

      return ctx.send({
        data: application,
        message: 'Application submitted successfully',
      });
    } catch (error) {
      console.error('Error creating job application:', error);
      return ctx.internalServerError('Failed to submit application');
    }
  },
}));
