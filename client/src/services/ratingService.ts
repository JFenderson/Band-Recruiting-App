import Rating from '../models/Rating';
import api from './apiConfig';

export const getStudentRatings = async (studentId: string): Promise<Rating[]> => {
    const response = await api.get<Rating[]>(`/Student/${studentId}/ratings`);
    return response.data;
};

export const rateVideo = async (ratingData: Partial<Rating>): Promise<Rating> => {
    const response = await api.post<Rating>('/ratings', ratingData);
    return response.data;
};