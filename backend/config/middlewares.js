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
      origin: [
        'http://localhost:3000',
        'http://localhost:5173', 
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:8080',
        // Production domains
        'https://autointelli.com',
        'https://www.autointelli.com',
        'http://autointelli.com',
        'http://www.autointelli.com',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
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
