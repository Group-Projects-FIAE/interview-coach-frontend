import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

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
            const response = await axios.post<TokenResponse>(`${API_BASE_URL}/login`, credentials);
            this.setToken(response.data.access_token)
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    public async signup(credentials: SignUpCredentials): Promise<void> {
        try {
            const response = await axios.post<TokenResponse>(`${API_BASE_URL}/signup`, credentials);
            this.setToken(response.data.access_token)
        } catch (error) {
            console.error('Signup failed:', error)
            throw error
        }
    }

    public logout(): void {
        this.token = null
        localStorage.removeItem('auth_token')
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