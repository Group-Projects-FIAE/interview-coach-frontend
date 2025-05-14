import axios from 'axios';
import { chatApi } from './api';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Create axios instance with default config
const authAxios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
authAxios.interceptors.request.use(
    (config) => {
        console.log('Request config:', config);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
authAxios.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export interface LoginCredentials {
    email: string
    password: string
}

export interface SignUpCredentials extends LoginCredentials {
    first_name: string
    last_name: string
}

export interface TokenResponse {
    access_token: string
}

class AuthService {
    private static instance: AuthService
    private token: string | null = null

    private constructor() {
        // Initialize token from localStorage if exists
        this.token = localStorage.getItem('auth_token')
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService()
        }
        return AuthService.instance
    }

    public async login(credentials: LoginCredentials): Promise<void> {
        try {
            const response = await authAxios.post<TokenResponse>('/auth/login', credentials);
            await this.handleAuthSuccess(response.data.access_token);
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    public async signup(credentials: SignUpCredentials): Promise<void> {
        try {
            console.log('Sending signup request with credentials:', {
                ...credentials,
                password: '[REDACTED]'
            });
            
            const response = await authAxios.post<TokenResponse>(
                '/auth/signup',
                credentials
            );
            
            await this.handleAuthSuccess(response.data.access_token);
        } catch (error: any) {
            console.error('Signup failed:', error);
            if (error.response) {
                console.error('Error response:', {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                    headers: error.response.headers
                });
                throw new Error(error.response.data.detail || 'Signup failed');
            } else if (error.request) {
                console.error('No response received:', error.request);
                throw new Error('No response received from server. Please check if the server is running.');
            } else {
                console.error('Error setting up request:', error.message);
                throw new Error('Network error. Please try again.');
            }
        }
    }

    private async handleAuthSuccess(token: string): Promise<void> {
        this.setToken(token);
        
        // Create a new session after successful auth
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId) {
            try {
                await chatApi.createSession(sessionId);
            } catch (error) {
                console.error('Failed to create session:', error);
                // Don't throw here - we want auth to succeed even if session creation fails
            }
        }
    }

    public logout(): void {
        this.token = null
        localStorage.removeItem('auth_token')
        localStorage.removeItem('sessionId')
    }

    public isAuthenticated(): boolean {
        return this.token !== null
    }

    public getToken(): string | null {
        return this.token
    }

    private setToken(token: string): void {
        this.token = token
        localStorage.setItem('auth_token', token)
    }

    public getAuthHeader(): { Authorization: string } | null {
        if (!this.token) return null;
        return { Authorization: `Bearer ${this.token}` }
    }
}

export const authService = AuthService.getInstance()