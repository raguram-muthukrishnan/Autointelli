module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
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
      requestTimeout: 60 * 1000, // 60 seconds for upload requests
    },
  },
});
