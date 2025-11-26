const BASE_URL = `${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}/api`;

// Generic fetch helper
const apiFetch = async (endpoint, options = {}) => {
  try {
    // Get JWT token from localStorage if it exists
    const jwt = localStorage.getItem('jwt');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add JWT token to Authorization header for all authenticated operations
    // For write operations (POST, PUT, DELETE), JWT is required
    // For read operations (GET), JWT is optional but helps with permissions
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      // Provide more detailed error information
      const errorText = await response.text();
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        
        // Check for detailed validation errors
        if (errorData.error?.details?.errors) {
          const validationErrors = errorData.error.details.errors
            .map(err => `${err.path?.join('.')}: ${err.message}`)
            .join('; ');
          errorMessage = `Validation errors: ${validationErrors}`;
        } else {
          errorMessage = errorData.error?.message || errorMessage;
        }
        
        // Log full error for debugging
        console.error('Full API error:', errorData);
      } catch (e) {
        // If not JSON, use the text
        if (errorText) errorMessage += ` - ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    // Handle empty responses (like DELETE operations)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      // Return empty object if response is empty
      return text ? JSON.parse(text) : {};
    }
    
    // For non-JSON responses, return success indicator
    return { success: true };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Blogs
export const fetchBlogs = async () => {
  return await apiFetch('/blogs?populate=*');
};

export const createBlog = async (title) => {
  return await apiFetch('/blogs', {
    method: 'POST',
    body: JSON.stringify({
      data: { title }
    }),
  });
};

// Webinars
export const fetchWebinars = async () => {
  // Note: If webinars schema has a 'published' field, add: &filters[published][$eq]=true
  return await apiFetch('/webinars?populate=*&sort=start_time:desc');
};

export const fetchWebinarBySlug = async (slug) => {
  console.log('API: Fetching webinar by slug:', slug);
  
  // Try by slug first
  const data = await apiFetch(`/webinars?filters[slug][$eq]=${slug}&populate=*`);
  console.log('API: Webinar response by slug:', data);
  console.log('API: Webinar data.data:', data.data);
  console.log('API: Webinar data.data length:', data.data?.length);
  
  if (data.data && data.data.length > 0) {
    return data.data[0];
  }
  
  // Try by documentId
  console.log('API: No webinar found by slug, trying by documentId:', slug);
  const byDocId = await apiFetch(`/webinars?filters[documentId][$eq]=${slug}&populate=*`);
  console.log('API: Webinar response by documentId:', byDocId);
  console.log('API: Webinar byDocId.data:', byDocId.data);
  console.log('API: Webinar byDocId.data length:', byDocId.data?.length);
  
  if (byDocId.data && byDocId.data.length > 0) {
    return byDocId.data[0];
  }
  
  // Try by numeric ID as last resort (only if slug is numeric)
  if (!isNaN(slug)) {
    console.log('API: No webinar found by documentId, trying by numeric ID:', slug);
    try {
      const byId = await apiFetch(`/webinars/${slug}?populate=*`);
      console.log('API: Webinar by numeric ID response:', byId);
      return byId.data;
    } catch (err) {
      console.error('API: Failed to fetch by numeric ID:', err);
    }
  }
  
  console.error('API: Webinar not found with slug:', slug);
  return null;
};

export const createWebinar = async (title) => {
  return await apiFetch('/webinars', {
    method: 'POST',
    body: JSON.stringify({
      data: { title }
    }),
  });
};

// Events
export const fetchEvents = async () => {
  // Note: If events schema has a 'published' field, add: &filters[published][$eq]=true
  return await apiFetch('/events?populate=*&sort=start_time:desc');
};

export const fetchEventBySlug = async (slug) => {
  console.log('API: Fetching event by slug:', slug);
  
  // Try by slug first
  const data = await apiFetch(`/events?filters[slug][$eq]=${slug}&populate=*`);
  console.log('API: Event response by slug:', data);
  console.log('API: Event data.data:', data.data);
  console.log('API: Event data.data length:', data.data?.length);
  
  if (data.data && data.data.length > 0) {
    return data.data[0];
  }
  
  // Try by documentId
  console.log('API: No event found by slug, trying by documentId:', slug);
  const byDocId = await apiFetch(`/events?filters[documentId][$eq]=${slug}&populate=*`);
  console.log('API: Event response by documentId:', byDocId);
  console.log('API: Event byDocId.data:', byDocId.data);
  console.log('API: Event byDocId.data length:', byDocId.data?.length);
  
  if (byDocId.data && byDocId.data.length > 0) {
    return byDocId.data[0];
  }
  
  // Try by numeric ID as last resort (only if slug is numeric)
  if (!isNaN(slug)) {
    console.log('API: No event found by documentId, trying by numeric ID:', slug);
    try {
      const byId = await apiFetch(`/events/${slug}?populate=*`);
      console.log('API: Event by numeric ID response:', byId);
      return byId.data;
    } catch (err) {
      console.error('API: Failed to fetch by numeric ID:', err);
    }
  }
  
  console.error('API: Event not found with slug:', slug);
  return null;
};

export const createEvent = async (title) => {
  return await apiFetch('/events', {
    method: 'POST',
    body: JSON.stringify({
      data: { title }
    }),
  });
};

// Generic Update/Delete
export const updateResource = async (resourceType, id, data) => {
  return await apiFetch(`/${resourceType}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
};

export const deleteResource = async (resourceType, id) => {
  return await apiFetch(`/${resourceType}/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Upload a file to Strapi
 * @param {File} file - The file to upload
 * @param {Object} options - Optional parameters for linking file to entry
 * @param {string} options.ref - The model UID (e.g., 'api::blog.blog')
 * @param {string} options.refId - The entry ID to link the file to
 * @param {string} options.field - The field name to link the file to
 * @returns {Promise<Array>} Array of uploaded file objects
 */
export const uploadFile = async (file, options = {}) => {
  console.log('🔵 [UPLOAD] Starting file upload');
  console.log('🔵 [UPLOAD] File details:', {
    name: file.name,
    size: file.size,
    type: file.type,
    sizeInMB: (file.size / 1024 / 1024).toFixed(2) + 'MB'
  });
  console.log('🔵 [UPLOAD] Options:', options);

  const jwt = localStorage.getItem('jwt');
  console.log('🔵 [UPLOAD] JWT token present:', !!jwt);

  const formData = new FormData();
  formData.append('files', file);

  // Add optional parameters for linking file to entry
  if (options.ref) formData.append('ref', options.ref);
  if (options.refId) formData.append('refId', options.refId);
  if (options.field) formData.append('field', options.field);

  const headers = {};
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  console.log('🔵 [UPLOAD] Sending request to:', `${BASE_URL}/upload`);
  
  try {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    console.log('🔵 [UPLOAD] Response status:', response.status);
    console.log('🔵 [UPLOAD] Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('🔴 [UPLOAD] Upload failed details:', errorData);
      console.error('🔴 [UPLOAD] Full error:', JSON.stringify(errorData, null, 2));
      throw new Error(errorData?.error?.message || 'Internal Server Error');
    }

    const result = await response.json();
    console.log('✅ [UPLOAD] Upload successful:', result);
    return result;
  } catch (error) {
    console.error('🔴 [UPLOAD] Exception during upload:', error);
    throw error;
  }
};

/**
 * Update file information (alternative text, caption, etc.)
 * @param {number} fileId - The ID of the file to update
 * @param {Object} fileInfo - The file information to update
 * @param {string} fileInfo.alternativeText - Alternative text for the image
 * @param {string} fileInfo.caption - Caption for the image
 * @param {string} fileInfo.name - Name of the file
 * @returns {Promise<Object>} Updated file object
 */
export const updateFileInfo = async (fileId, fileInfo) => {
  const jwt = localStorage.getItem('jwt');
  const formData = new FormData();
  formData.append('fileInfo', JSON.stringify(fileInfo));

  const headers = {};
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  const response = await fetch(`${BASE_URL}/upload?id=${fileId}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Failed to update file info');
  }

  return await response.json();
};

// Newsletter Subscriptions
export const subscribeNewsletter = async (name, email, categories = []) => {
  return await apiFetch('/newsletter-subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      data: { name, email, categories }
    }),
  });
};

export const unsubscribeNewsletter = async (token) => {
  return await apiFetch(`/newsletter-subscriptions/unsubscribe/${token}`, {
    method: 'POST',
  });
};

// Jobs
export const fetchJobs = async () => {
  return await apiFetch('/jobs?populate=*&sort=createdAt:desc');
};

export const fetchJobBySlug = async (slug) => {
  const data = await apiFetch(`/jobs?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0];
};

// Job Applications
export const submitJobApplication = async (applicationData) => {
  return await apiFetch('/job-applications', {
    method: 'POST',
    body: JSON.stringify({
      data: applicationData
    }),
  });
};

export const uploadResume = async (file) => {
  const jwt = localStorage.getItem('jwt');
  const formData = new FormData();
  formData.append('files', file);

  const headers = {};
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Resume upload failed');
  }

  return await response.json();
};

// CTA Inquiries
export const submitCTAInquiry = async (inquiryData) => {
  return await apiFetch('/cta-inquiries', {
    method: 'POST',
    body: JSON.stringify({
      data: inquiryData
    }),
  });
};

// Partner Requests
export const submitPartnerRequest = async (partnerData) => {
  return await apiFetch('/partner-requests', {
    method: 'POST',
    body: JSON.stringify({
      data: partnerData
    }),
  });
};

// Resources
/**
 * Fetch resources with pagination, filtering, and search
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.pageSize - Number of items per page (default: 12)
 * @param {string[]} params.category - Array of categories to filter by
 * @param {string} params.search - Search term for title and description
 * @param {boolean} params.published - Filter by published status (default: true)
 * @returns {Promise} Response with data and pagination metadata
 */
export const fetchResources = async (params = {}) => {
  const { 
    page = 1, 
    pageSize = 12, 
    category, 
    search
  } = params;
  
  // Check if published filter is explicitly provided
  const published = params.hasOwnProperty('published') ? params.published : true;
  
  let query = `/resources?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;
  
  // Filter by published status (only if not explicitly set to null/undefined)
  if (published !== null && published !== undefined) {
    query += `&filters[published][$eq]=${published}`;
  }
  
  // Filter by categories (OR logic - match any selected category)
  if (category && Array.isArray(category) && category.length > 0) {
    category.forEach(cat => {
      query += `&filters[category][$in]=${encodeURIComponent(cat)}`;
    });
  }
  
  // Search in title and description (case-insensitive)
  if (search && search.trim()) {
    const searchTerm = encodeURIComponent(search.trim());
    query += `&filters[$or][0][title][$containsi]=${searchTerm}`;
    query += `&filters[$or][1][description][$containsi]=${searchTerm}`;
  }
  
  // Sort by creation date descending (newest first)
  query += '&sort=createdAt:desc';
  
  return await apiFetch(query);
};

/**
 * Download a resource file and track the download
 * @param {number|string} id - Resource ID
 * @returns {Promise<Blob>} File blob for download
 */
export const downloadResource = async (id) => {
  const jwt = localStorage.getItem('jwt');
  
  const headers = {};
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  
  const response = await fetch(`${BASE_URL}/resources/${id}/download`, {
    method: 'GET',
    headers,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Download failed! status: ${response.status}`;
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error?.message || errorMessage;
    } catch (e) {
      if (errorText) errorMessage += ` - ${errorText}`;
    }
    
    throw new Error(errorMessage);
  }
  
  // Return the blob for download
  return await response.blob();
};

/**
 * Create a new resource (admin only)
 * @param {Object} resourceData - Resource data
 * @param {string} resourceData.title - Resource title
 * @param {string} resourceData.description - Resource description
 * @param {number} resourceData.file - File ID from upload
 * @param {string[]} resourceData.category - Array of categories
 * @param {boolean} resourceData.published - Published status
 * @returns {Promise} Created resource
 */
export const createResource = async (resourceData) => {
  return await apiFetch('/resources', {
    method: 'POST',
    body: JSON.stringify({
      data: resourceData
    }),
  });
};

/**
 * Validate file for resource upload
 * @param {File} file - File to validate
 * @returns {Object} Validation result with isValid and error properties
 */
export const validateResourceFile = (file) => {
  const allowedTypes = ['application/pdf', 'text/csv'];
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  
  if (!file) {
    return {
      isValid: false,
      error: 'Please select a file to upload'
    };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only PDF and CSV files are allowed'
    };
  }
  
  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must not exceed 10MB'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};
