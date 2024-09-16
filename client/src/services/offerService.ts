import Offer from '../models/Offer';
import api from './apiConfig';

export const getAllOffers = async (): Promise<Offer[]> => {
    try {
        const response = await api.get<Offer[]>(`/Offer`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all offers:', error);
        throw error;
    }
};

export const getOffer = async (id: string): Promise<Offer> => {
    try {
        const response = await api.get<Offer>(`/Offer/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching offer:', error);
        throw error;
    }
};

export const getOffersByStudentId = async (studentId: string): Promise<Offer[]> => {
    try {
        const response = await api.get<Offer[]>(`/Offer/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching offers by student:', error);
        throw error;
    }
};

export const getOffersByBandId = async (bandId: string): Promise<Offer[]> => {
    try {
        const response = await api.get<Offer[]>(`/Offer/band/${bandId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching offers by band:', error);
        throw error;
    }
};

export const getOffersForRecruiter = async (recruiterId: string): Promise<Offer[]> => {
    try {
        const response = await api.get<Offer[]>(`/Offer/recruiter/${recruiterId}/offers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching offers for recruiter:', error);
        throw error;
    }
};

export const createOffer = async (recruiterId: string, studentId: string, offerData: Partial<Offer>): Promise<Offer> => {
    try {
        const response = await api.post<Offer>(`/Offer/recruiter/${recruiterId}/student/${studentId}/offers`, offerData);
        return response.data;
    } catch (error) {
        console.error('Error creating offer:', error);
        throw error;
    }
};

export const updateOffer = async (offerId: string, amount: number): Promise<Offer> => {
    try {
        const response = await api.put<Offer>(`/Offer/${offerId}/offers`, amount);
        return response.data;
    } catch (error) {
        console.error('Error updating offer:', error);
        throw error;
    }
};

export const deleteOffer = async (id: string): Promise<void> => {
    try {
        await api.delete(`/Offer/${id}`);
    } catch (error) {
        console.error('Error deleting offer:', error);
        throw error;
    }
};