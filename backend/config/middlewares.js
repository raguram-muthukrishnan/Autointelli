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
        'https://autointelli.com',
        'https://www.autointelli.com',
        'http://localhost:5173', // Vite dev server
        'http://localhost:3000', // Alternative dev port
        'http://localhost:8080', // Docker frontend
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:8080'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
      credentials: true,
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '100mb', // Form body limit
      jsonLimit: '100mb', // JSON body limit
      textLimit: '100mb', // Text body limit
      formidable: {
        maxFileSize: 100 * 1024 * 1024, // 100MB for file uploads
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
