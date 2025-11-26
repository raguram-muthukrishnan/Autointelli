import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/**
 * Submit resource download with email capture
 * @param {Object} data - Download data
 * @param {string} data.email - User email
 * @param {string} data.name - User name (optional)
 * @param {string} data.resourceName - Name of the resource
 * @param {string} data.resourceType - Type (whitepaper, ebook, guide, etc.)
 * @param {string} data.resourceUrl - URL of the resource
 * @returns {Promise} API response
 */
export const submitResourceDownload = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/resource-downloads`, {
      data: {
        email: data.email,
        name: data.name || null,
        resourceName: data.resourceName,
        resourceType: data.resourceType || 'other',
        resourceUrl: data.resourceUrl,
        downloadedAt: new Date().toISOString(),
        ipAddress: null, // Can be captured server-side
        userAgent: navigator.userAgent
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting resource download:', error);
    throw error;
  }
};

/**
 * Get all resource downloads (admin only)
 * @returns {Promise} List of downloads
 */
export const getResourceDownloads = async () => {
  try {
    const jwt = localStorage.getItem('jwt');
    const headers = {};
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
    
    const response = await axios.get(
      `${API_URL}/api/resource-downloads?populate=*&sort=downloadedAt:desc`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching resource downloads:', error);
    throw error;
  }
};

/**
 * Export resource downloads to CSV
 * @returns {string} CSV content
 */
export const exportResourceDownloadsCSV = (downloads) => {
  const headers = ['Date', 'Email', 'Name', 'Resource Name', 'Resource Type', 'User Agent'];
  const rows = downloads.map(download => {
    const data = download.attributes || download;
    return [
      new Date(data.downloadedAt).toLocaleString(),
      data.email,
      data.name || 'N/A',
      data.resourceName,
      data.resourceType,
      data.userAgent || 'N/A'
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content
 * @param {string} filename - Filename for download
 */
export const downloadCSV = (csvContent, filename = 'resource-downloads.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
