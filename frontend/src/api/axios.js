// import axios from 'axios';

// // Falls back to localhost if environment variable isn't set
// export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// const api = axios.create({
//     baseURL: API_URL
// });

// // Automatically attach the JWT token to every request
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default api;

import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true // Crucial: Tells the browser to attach the HTTP-Only cookie
});

// Delete the interceptor. The browser handles the cookie automatically now.

export default api;