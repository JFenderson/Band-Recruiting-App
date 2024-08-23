import { Offer } from '../models/Offer';
import api from './apiConfig';

export const getStudentOffers = async (studentId: string): Promise<Offer[]> => {
    const response = await api.get<Offer[]>(`/students/${studentId}/offers`);
    return response.data;
};

export const sendOffer = async (offerData: Partial<Offer>): Promise<Offer> => {
    const response = await api.post<Offer>('/offers', offerData);
    return response.data;
};