import { Video } from '../models/Video';
import api from './apiConfig';

export const getStudentVideos = async (studentId: string): Promise<Video[]> => {
    const response = await api.get<Video[]>(`/students/${studentId}/videos`);
    return response.data;
};

export const uploadVideo = async (studentId: string, videoData: Partial<Video>): Promise<Video> => {
    const response = await api.post<Video>(`/students/${studentId}/videos`, videoData);
    return response.data;
};