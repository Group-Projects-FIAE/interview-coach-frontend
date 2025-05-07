import axios from 'axios';
import { authService } from './auth';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const authHeader = authService.getAuthHeader();
        if (authHeader) {
            config.headers.Authorization = authHeader.Authorization;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            authService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const chatApi = {
    sendMessage: async (sessionId: string, userInput: string) => {
        try {
            const response = await api.post(`/chat`, {
                sessionId: sessionId,
                userInput: userInput
            });
            return response.data;
        } catch (error) {
            console.error('Message sending failed:', error);
            throw error;
        }
    },

    getChatHistory: async (sessionId: string) => {
        const response = await api.get(`/chat/history/${sessionId}`);
        return response.data;
    },

    getJobDescription: async (sessionId: string) => {
        const response = await api.get(`/chat/job-description/${sessionId}`);
        return response.data;
    },

    createJobDescription: async (sessionId: string) => {
        const response = await api.post(`/chat/job-description`, null, {
            params: { session_id: sessionId }
        });
        return response.data;
    },

    createSession: async (sessionId: string) => {
        try {
            console.log('Creating session with ID:', sessionId);
            const response = await api.post(`/session?session_id=${sessionId}`);
            console.log('Session creation response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Session creation failed:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            throw error;
        }
    }
}; 