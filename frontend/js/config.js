// frontend/js/config.js

/**
 * Central configuration for the Water Management frontend.
 * Adjust the values here to point to the real Spring Cloud Gateway
 * when the backend services become available.
 */

const CONFIG = {
  // Base URL of the Spring Cloud Gateway
  API_BASE_URL: 'http://localhost:8081',

  // Set to true to use built-in mock data instead of real API calls.
  DEMO_MODE: true,
};
