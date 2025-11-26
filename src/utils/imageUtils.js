/**
 * Utility function to build absolute image URLs from Strapi responses
 * @param {Object} file - The file object from Strapi (can be nested in data.attributes)
 * @param {string} placeholder - Optional placeholder image URL
 * @returns {string} - Absolute image URL or placeholder
 */
export const buildImageUrl = (file, placeholder = null) => {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
  
  // Default placeholder if none provided
  const defaultPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%23f0f0f0" width="800" height="500"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="36" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
  
  if (!file) {
    return placeholder || defaultPlaceholder;
  }
  
  // Handle different Strapi response structures
  let url = null;
  
  // Check for nested structure: file.data.attributes.url
  if (file.data?.attributes?.url) {
    url = file.data.attributes.url;
  }
  // Check for direct attributes: file.attributes.url
  else if (file.attributes?.url) {
    url = file.attributes.url;
  }
  // Check for direct url property: file.url
  else if (file.url) {
    url = file.url;
  }
  
  if (!url) {
    return placeholder || defaultPlaceholder;
  }
  
  // If URL is already absolute (starts with http/https), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, prepend STRAPI_URL
  return `${STRAPI_URL}${url}`;
};
