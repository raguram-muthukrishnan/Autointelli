/**
 * Product Color Configuration
 * Colors extracted from product icons for consistent theming across product detail pages
 */

export const productColors = {
  // Autointelli NMS (360) - Blue/Purple theme
  'nms': {
    primary: '#2e3591',      // Deep blue from NMS icon
    secondary: '#4a5bb5',    // Lighter blue
    light: '#c5cae9',        // Very light blue for backgrounds
    text: '#2e3591',         // Text color matching primary
    dotColor: '#7a80c4',     // Dot grid color
    gradient: 'linear-gradient(135deg, #2e3591 0%, #4a5bb5 100%)',
    shadow: 'rgba(46, 53, 145, 0.2)',
    hover: 'rgba(46, 53, 145, 0.1)'
  },

  // Autointelli Securita - Purple/Magenta theme
  'securita': {
    primary: '#91298e',      // Purple from Securita icon
    secondary: '#b03aad',    // Lighter purple
    light: '#e1c4df',        // Very light purple for backgrounds
    text: '#91298e',         // Text color matching primary
    dotColor: '#c76bc4',     // Dot grid color
    gradient: 'linear-gradient(135deg, #91298e 0%, #b03aad 100%)',
    shadow: 'rgba(145, 41, 142, 0.2)',
    hover: 'rgba(145, 41, 142, 0.1)'
  },

  // Autointelli OpsDuty - Red/Orange theme
  'incident-response': {
    primary: '#f14e40',      // Red from OpsDuty icon
    secondary: '#ff6b5c',    // Lighter red
    light: '#ffd4cf',        // Very light red for backgrounds
    text: '#f14e40',         // Text color matching primary
    dotColor: '#ff7a6b',     // Dot grid color
    gradient: 'linear-gradient(135deg, #f14e40 0%, #ff6b5c 100%)',
    shadow: 'rgba(241, 78, 64, 0.2)',
    hover: 'rgba(241, 78, 64, 0.1)'
  },

  // IntelliFlow - Cyan/Blue theme
  'flow': {
    primary: '#26b4e8',      // Cyan from Flow icon
    secondary: '#4dc5f0',    // Lighter cyan
    light: '#b3e5f7',        // Very light cyan for backgrounds
    text: '#26b4e8',         // Text color matching primary
    dotColor: '#6dd5ff',     // Dot grid color
    gradient: 'linear-gradient(135deg, #26b4e8 0%, #4dc5f0 100%)',
    shadow: 'rgba(38, 180, 232, 0.2)',
    hover: 'rgba(38, 180, 232, 0.1)'
  },

  // Alice AI - Pink/Magenta theme
  'alice-ai': {
    primary: '#ed1265',      // Pink from Alice icon
    secondary: '#ff3d85',    // Lighter pink
    light: '#ffc9e0',        // Very light pink for backgrounds
    text: '#ed1265',         // Text color matching primary
    dotColor: '#ff6b9d',     // Dot grid color
    gradient: 'linear-gradient(135deg, #ed1265 0%, #ff3d85 100%)',
    shadow: 'rgba(237, 18, 101, 0.2)',
    hover: 'rgba(237, 18, 101, 0.1)'
  },

  // IntelliDesk - Green theme
  'it-desk': {
    primary: '#8dc641',      // Green from HelpDesk icon
    secondary: '#a5d65f',    // Lighter green
    light: '#dcefc0',        // Very light green for backgrounds
    text: '#8dc641',         // Text color matching primary
    dotColor: '#b5e06f',     // Dot grid color
    gradient: 'linear-gradient(135deg, #8dc641 0%, #a5d65f 100%)',
    shadow: 'rgba(141, 198, 65, 0.2)',
    hover: 'rgba(141, 198, 65, 0.1)'
  },

  // IntelliAsset - Orange theme
  'asset': {
    primary: '#f58220',      // Orange from Asset icon
    secondary: '#ff9d47',    // Lighter orange
    light: '#ffe0c2',        // Very light orange for backgrounds
    text: '#f58220',         // Text color matching primary
    dotColor: '#ffad5c',     // Dot grid color
    gradient: 'linear-gradient(135deg, #f58220 0%, #ff9d47 100%)',
    shadow: 'rgba(245, 130, 32, 0.2)',
    hover: 'rgba(245, 130, 32, 0.1)'
  }
};

/**
 * Get color configuration for a specific product
 * @param {string} productId - The product identifier
 * @returns {object} Color configuration object
 */
export const getProductColors = (productId) => {
  return productColors[productId] || productColors['nms']; // Default to NMS colors
};

/**
 * Generate CSS custom properties for a product
 * @param {string} productId - The product identifier
 * @returns {object} CSS custom properties object
 */
export const getProductCSSVars = (productId) => {
  const colors = getProductColors(productId);
  return {
    '--product-primary': colors.primary,
    '--product-secondary': colors.secondary,
    '--product-light': colors.light,
    '--product-text': colors.text,
    '--product-dot': colors.dotColor,
    '--product-gradient': colors.gradient,
    '--product-shadow': colors.shadow,
    '--product-hover': colors.hover
  };
};
