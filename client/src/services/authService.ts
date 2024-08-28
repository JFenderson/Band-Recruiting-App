import axios from "axios";
import {setAuthToken} from './apiConfig';

const API_URL = 'https://localhost:7055/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bandId?: number; // Optional if you're registering as a recruiter
}

export interface LoginCredentials {
  userName: string;
  password: string;
  
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  role:string;
  userId: string;
}

// Register function
export const register = async (credentials: RegisterCredentials): Promise<void> => {
  await api.post('/Admin/create-user', credentials);
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/Account/login', credentials);
    setAuthToken(response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    console.log('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }

};


export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<AuthResponse>('/Account/refresh-token', { token: refreshToken });
    const { token, refreshToken: newRefreshToken } = response.data;

    setAuthToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', newRefreshToken);

    return token;
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
};

export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};