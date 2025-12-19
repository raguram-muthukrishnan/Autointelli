/**
 * Security Headers Middleware
 * Adds security headers to prevent external script injection and tracking
 */
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Set security headers
    ctx.set('X-Content-Type-Options', 'nosniff');
    ctx.set('X-Frame-Options', 'DENY');
    ctx.set('X-XSS-Protection', '1; mode=block');
    ctx.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions Policy - Disable unnecessary features
    ctx.set('Permissions-Policy', 
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    );

    // Content Security Policy for admin panel
    if (ctx.url.startsWith('/admin')) {
      ctx.set('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://autointelli.com",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
      ].join('; '));
    }
  };
};
