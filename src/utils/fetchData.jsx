// src/utils/fetchData.jsx

/**
 * Generic fetch function for API requests.
 * @param {string} url - The endpoint URL.
 * @param {Object} options - Fetch options (headers, method, etc).
 * @returns {Promise<any>} - The JSON response.
 */
export const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Fetch error at ${url}:`, error);
      throw error;
    }
  };
  