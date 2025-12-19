module.exports = [
  'strapi::logger',
  'strapi::errors',
  'global::upload-error-handler', // Custom middleware to handle Windows upload errors
  'global::security-headers', // Custom security headers to prevent external tracking
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['*'], // Allow all origins to fix "Failed to fetch" errors on deployment
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '10mb', // Form body limit
      jsonLimit: '10mb', // JSON body limit
      textLimit: '10mb', // Text body limit
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 10MB for file uploads
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
