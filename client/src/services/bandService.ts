import  Band  from '../models/Band';
import api from './apiConfig';


export const getBands = async (): Promise<Band[]> => {
    const response = await api.get<Band[]>('/bands');
    return response.data;
};

export const getBandById = async (bandId: number): Promise<Band> => {
    const response = await api.get<Band>(`/bands/${bandId}`);
    return response.data;
};

export const createBand = async (bandData: Partial<Band>): Promise<Band> => {
    const response = await api.post<Band>('/bands', bandData);
    return response.data;
};

export const updateBand = async (bandId: number, bandData: Partial<Band>): Promise<Band> => {
    const response = await api.put<Band>(`/bands/${bandId}`, bandData);
    return response.data;
};

export const deleteBand = async (bandId: number): Promise<void> => {
    await api.delete(`/bands/${bandId}`);
};