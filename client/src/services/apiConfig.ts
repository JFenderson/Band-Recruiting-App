import axios from 'axios';

const API_URL = 'https://localhost:7055/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Function to set the Authorization header with the token
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Optionally, you can include a request interceptor to handle token refresh automatically
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Call the refresh token endpoint here
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/Account/refresh-token`, {
                        token: refreshToken,
                    });

                    const { token: newToken, refreshToken: newRefreshToken } = response.data;

                    // Store the new tokens
                    setAuthToken(newToken);
                    localStorage.setItem('token', newToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    // Retry the original request with the new token
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Handle the case where the refresh token fails (e.g., logout the user)
            }
        }

        return Promise.reject(error);
    }
);

export default api;
