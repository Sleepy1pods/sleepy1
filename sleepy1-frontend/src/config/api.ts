/**
 * API configuration
 * Strips any trailing slash to prevent double slashes in request paths.
 * Falls back to http://localhost:5000 if VITE_API_URL is not set.
 */
const envApiUrl = import.meta.env.VITE_API_URL

export const API_BASE_URL = (envApiUrl && envApiUrl.trim() !== '' ? envApiUrl : 'http://localhost:5000').replace(/\/+$/, '')
