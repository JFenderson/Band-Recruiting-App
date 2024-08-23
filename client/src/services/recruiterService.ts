import { Recruiter } from '../models/Recruiter';
import api from './apiConfig';

export const getRecruiters = async (): Promise<Recruiter[]> => {
    const response = await api.get<Recruiter[]>('/recruiters');
    return response.data;
};

export const getRecruiterById = async (recruiterId: string): Promise<Recruiter> => {
    const response = await api.get<Recruiter>(`/recruiters/${recruiterId}`);
    return response.data;
};

export const createRecruiter = async (recruiterData: Partial<Recruiter>): Promise<Recruiter> => {
    const response = await api.post<Recruiter>('/recruiters', recruiterData);
    return response.data;
};

export const updateRecruiter = async (recruiterId: string, recruiterData: Partial<Recruiter>): Promise<Recruiter> => {
    const response = await api.put<Recruiter>(`/recruiters/${recruiterId}`, recruiterData);
    return response.data;
};

export const deleteRecruiter = async (recruiterId: string): Promise<void> => {
    await api.delete(`/recruiters/${recruiterId}`);
};