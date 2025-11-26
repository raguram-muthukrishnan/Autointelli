module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        localServer: {
          maxage: 300000, // Cache max age in milliseconds
        },
      },
      // File size limits (10MB)
      sizeLimit: 10 * 1024 * 1024,
      // Security: Validate files by MIME type
      security: {
        allowedTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/svg+xml',
          'image/webp',
          'application/pdf',
          'text/csv',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        deniedTypes: [
          'application/x-sh',
          'application/x-dosexec',
          'application/x-executable',
        ],
      },
      // Responsive image breakpoints (disabled Sharp due to Windows issues)
      breakpoints: {
        xlarge: 1920,
        large: 1200,
        medium: 750,
        small: 500,
      },
      // Disable image processing to prevent Windows EPERM errors
      sizeOptimization: false,
      responsiveDimensions: false,
      autoOrientation: false,
      sharp: false,
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'noreply@autointelli.com'),
        defaultReplyTo: env('SMTP_FROM', 'noreply@autointelli.com'),
      },
    },
  },
});
