import axios from "axios";

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
  role:string;
}

// Register function
export const register = async (credentials: RegisterCredentials): Promise<void> => {
  await api.post('/Admin/create-user', credentials);
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/Account/login', credentials);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }

};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};