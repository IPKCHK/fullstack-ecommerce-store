// import { create } from 'zustand';

// export const useAuthStore = create((set) => ({
//     // Initialize state from localStorage if it exists
//     user: JSON.parse(localStorage.getItem("user")) || null,
    
//     // Actions to update state
//     login: (userData, token) => {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(userData));
//         set({ user: userData });
//     },
    
//     logout: () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         set({ user: null });
//     }
// }));

import { create } from 'zustand';
import api from '../api/axios';

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    
    login: (userData) => {
        // We only save the user object to show their name in the UI
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
    },
    
    logout: async () => {
        try {
            // Tell the backend to destroy the cookie
            await api.post("/auth/logout");
        } catch (error) {
            console.log("Logout error", error);
        } finally {
            localStorage.removeItem("user");
            set({ user: null });
        }
    }
}));

