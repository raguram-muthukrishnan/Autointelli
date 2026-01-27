import AuthLogo from './extensions/auth-logo.png';
import MenuLogo from './extensions/menu-logo.png';
import favicon from './extensions/favicon.png';
import ExportPage from './pages/ExportPage';

const config = {
  // Replace the Strapi logo in auth (login) views
  auth: {
    logo: AuthLogo,
  },
  // Replace the favicon
  head: {
    favicon: favicon,
  },
  // Replace the Strapi logo in the main navigation
  menu: {
    logo: MenuLogo,
  },
  // Custom theme with your brand colors
  theme: {
    light: {
      colors: {
        // Primary brand colors - Yellow highlights
        primary100: '#fffbeb', // Very light yellow
        primary200: '#fff4cc', // Light yellow
        primary500: '#FFD600', // Your primary yellow
        primary600: '#e6c100', // Your yellow hover
        primary700: '#ccaa00', // Darker yellow
        
        // Secondary/accent colors - Blue highlights
        secondary100: '#eff6ff', // Very light blue
        secondary200: '#dbeafe', // Light blue
        secondary500: '#4a90e2', // Your focus blue
        secondary600: '#3b82f6', // Medium blue
        secondary700: '#2563eb', // Darker blue
        
        // Alternative colors for small highlights
        alternative100: '#f0f9ff',
        alternative200: '#e0f2fe',
        alternative500: '#0ea5e9',
        alternative600: '#0284c7',
        alternative700: '#0369a1',
        
        // Neutral colors
        neutral0: '#ffffff',
        neutral100: '#f8fafc',
        neutral150: '#f1f5f9',
        neutral200: '#e2e8f0',
        neutral300: '#cbd5e1',
        neutral400: '#94a3b8',
        neutral500: '#64748b',
        neutral600: '#475569',
        neutral700: '#334155',
        neutral800: '#1e293b',
        neutral900: '#0f172a', // Your primary dark
        
        // Success colors
        success100: '#f0fdf4',
        success200: '#dcfce7',
        success500: '#22c55e',
        success600: '#16a34a',
        success700: '#15803d',
        
        // Danger colors
        danger100: '#fef2f2',
        danger200: '#fecaca',
        danger500: '#ef4444',
        danger600: '#dc2626',
        danger700: '#b91c1c',
        
        // Warning colors (using your yellow)
        warning100: '#fffbeb',
        warning200: '#fff4cc',
        warning500: '#FFD600',
        warning600: '#e6c100',
        warning700: '#ccaa00',
        
        // Button colors
        buttonPrimary500: '#FFD600',
        buttonPrimary600: '#e6c100',
        buttonNeutral0: '#ffffff',
      },
    },
  },
  // Disable video tutorials (optional - you can change this to true if you want them)
  tutorials: false,
  // Disable notifications about new Strapi releases (optional)
  notifications: { releases: false },
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {
  console.log(app);
  
  // Add the export page route
  app.addMenuLink({
    to: '/plugins/export-data',
    icon: () => '📊',
    intlLabel: {
      id: 'export-data',
      defaultMessage: 'Export Data',
    },
    Component: async () => {
      const module = await import('./pages/ExportPage');
      return module.default;
    },
    permissions: [],
  });
};

export default {
  config,
  bootstrap,
};
