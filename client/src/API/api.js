import axios from 'axios';

const API_URL = 'https://localhost:5001/api'; // Your .NET Core backend URL

export const registerUser = async (userData: any) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (loginData: any) => {
    return await axios.post(`${API_URL}/auth/login`, loginData);
};

const api = axios.create({
    baseURL: API_URL, // Replace with your actual API base URL
  });
  
  export default api;

// Add other service methods


