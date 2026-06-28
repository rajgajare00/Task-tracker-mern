import axios from 'axios';

// Use the Vite environment variable configured in .env for the backend URL.
// Falls back to localhost for local development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 8000,
});

export default api;
