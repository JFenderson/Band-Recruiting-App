import  Band  from '../models/Band';
import Student from '../models/Student';
import api from './apiConfig';

export interface Interest {
    interestId: number;
    studentId: string; // Reference to the interested student
    bandId: number; // Reference to the band of interest
    isInterested: boolean;
    bandName: string;
    interestDate: string;
    student?: Student;
    band?: Band;
}

export const addInterest = async (userId: string, bandId: string) => {
    return await api.post(`/Student/${userId}/interests`, { bandId });
};

export const getStudentInterests = async (userId: string) => {
    return await api.get<Interest[]>(`/Student/${userId}/interests`);
};

export const getBandInterests = async (bandId: string) => {
    return await api.get<Student[]>(`/Bands/${bandId}/interestedStudents`);
};

