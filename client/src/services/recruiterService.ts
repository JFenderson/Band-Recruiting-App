import Offer from '../models/Offer';
import Recruiter  from '../models/Recruiter';
import api from './apiConfig';

export const getRecruiters = async (): Promise<Recruiter[]> => {
    const response = await api.get<Recruiter[]>('/Recruiter');
    return response.data;
};

export const getRecruiterById = async (recruiterId: string): Promise<Recruiter> => {
    const response = await api.get<Recruiter>(`/Recruiter/${recruiterId}`);
    return response.data;
};

export const createRecruiter = async (recruiterData: Partial<Recruiter>): Promise<Recruiter> => {
    const response = await api.post<Recruiter>('/Recruiter', recruiterData);
    return response.data;
};

export const updateRecruiter = async (recruiterId: string, recruiterData: Partial<Recruiter>): Promise<Recruiter> => {
    const response = await api.put<Recruiter>(`/Recruiter/${recruiterId}`, recruiterData);
    return response.data;
};

export const deleteRecruiter = async (recruiterId: string): Promise<void> => {
    await api.delete(`/Recruiter/${recruiterId}`);
};

export const getRecruiterOffers = async (recruiterId: string) => {
    return await api.get(`/Recruiter/${recruiterId}/offers`);
};

export const getRecruiterProfile = async (recruiterId: string) => {
    return await api.get(`/Recruiter/${recruiterId}`);
};

export const getOffersByRecruiterId = async (recruiterId: string): Promise<Offer[]> => {
    const response = await api.get<Offer[]>(`/Recruiter/${recruiterId}/offers`);
    return response.data;
  };

  export const getRecruitersByBand = async (bandId: string): Promise<Recruiter[]> => {
    const response = await api.get<Recruiter[]>(`/Recruiter/band/${bandId}`);
    return response.data;
  };


  export const deleteRecruiterOffer = async (offerId: string): Promise<void> => {
    await api.delete(`/Recruiter/${offerId}/offer`);
};

