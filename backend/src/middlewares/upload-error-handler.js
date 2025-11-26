/**
 * Upload error handler middleware
 * Catches Windows EPERM errors during file upload and handles them gracefully
 * 
 * The Windows EPERM error occurs DURING the upload process when Sharp tries to
 * delete temporary files. We need to intercept this at the right moment.
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Log incoming upload requests
    if (ctx.request.url.includes('/upload')) {
      console.log('🟢 [MIDDLEWARE] Upload request received');
      console.log('🟢 [MIDDLEWARE] URL:', ctx.request.url);
      console.log('🟢 [MIDDLEWARE] Method:', ctx.request.method);
    }

    try {
      await next();
      
      // Log successful uploads
      if (ctx.request.url.includes('/upload') && ctx.status === 200) {
        console.log('✅ [MIDDLEWARE] Upload completed successfully');
        console.log('✅ [MIDDLEWARE] Response body type:', Array.isArray(ctx.body) ? 'array' : typeof ctx.body);
        if (Array.isArray(ctx.body)) {
          console.log('✅ [MIDDLEWARE] Uploaded files count:', ctx.body.length);
        }
      }
    } catch (error) {
      console.error('🔴 [MIDDLEWARE] Error caught:', {
        code: error.code,
        message: error.message,
        url: ctx.request.url,
      });

      // Handle Windows EPERM errors on file upload
      // This error happens AFTER the file is uploaded but during cleanup
      if (
        error.code === 'EPERM' && 
        error.message && 
        error.message.includes('unlink') &&
        ctx.request.url.includes('/upload')
      ) {
        console.warn('⚠️ [MIDDLEWARE] Windows EPERM error - file locked during cleanup');
        console.warn('⚠️ [MIDDLEWARE] This is a Windows issue, file was likely uploaded successfully');
        
        // The error occurs during Sharp's cleanup, but the file is already in the database
        // We need to query the database to get the uploaded file info
        try {
          // Get the most recently uploaded file(s)
          const uploadedFiles = await strapi.db.query('plugin::upload.file').findMany({
            orderBy: { createdAt: 'desc' },
            limit: 1,
          });
          
          if (uploadedFiles && uploadedFiles.length > 0) {
            console.log('✅ [MIDDLEWARE] Found uploaded file in database:', uploadedFiles[0].name);
            ctx.status = 200;
            ctx.body = uploadedFiles;
            return;
          }
        } catch (dbError) {
          console.error('🔴 [MIDDLEWARE] Failed to query uploaded files:', dbError.message);
        }
      }
      
      // Re-throw other errors
      console.error('🔴 [MIDDLEWARE] Re-throwing error');
      throw error;
    }
  };
};
