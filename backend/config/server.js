module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://autointelli.com'),
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Disable telemetry to prevent analytics errors
  telemetryDisabled: true,
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // HTTP server options for file uploads
  http: {
    serverOptions: {
      requestTimeout: 300 * 1000, // 5 minutes for large file upload requests
      headersTimeout: 300 * 1000, // Same as requestTimeout
      keepAliveTimeout: 5 * 1000,
    },
  },
});
