module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Use relative path to avoid protocol mismatch issues (relying on browser to handle protocol)
  url: '/admin',
  serveAdminPanel: true,
  forgotPassword: {
    from: env('ADMIN_EMAIL', 'no-reply@autointelli.com'),
    replyTo: env('ADMIN_EMAIL', 'no-reply@autointelli.com'),
  },
});
