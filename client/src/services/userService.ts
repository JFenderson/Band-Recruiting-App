import api from './apiConfig';
import { User } from '../models/User';

export const getUserById = async (userId: string): Promise<User> => {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
};

export const changePassword = async (userId: string, newPassword: string): Promise<void> => {
    await api.post(`/users/${userId}/change-password`, { newPassword });
};

export const assignRoleToUser = async (userId: string, role: string): Promise<void> => {
    await api.post(`/users/${userId}/roles`, { role });
};