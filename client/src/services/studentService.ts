import { Offer } from '../models/Offer';
import  Rating  from '../models/Rating';
import  Student  from '../models/Student';
import { Video } from '../models/Video';
import api from './apiConfig';

export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/Student');
    return response.data;
};

export const getStudentById = async (studentId: string): Promise<Student> => {
    const response = await api.get<Student>(`/Student/${studentId}`);
    return response.data;
};

export const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
    const response = await api.post<Student>('/Student', studentData);
    return response.data;
};

export const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
    const response = await api.put<Student>(`/Student/${studentId}/profile`, studentData);
    return response.data;
};

export const deleteStudent = async (studentId: string): Promise<void> => {
    await api.delete(`/Student/${studentId}`);
};

export const uploadStudentVideo = async (studentId: string, videoData: Video) => {
    const response = await api.post<Video>(`/Student/${studentId}/videos`, videoData);
    return response.data;
  };
  
  export const getStudentsByGradYear = async (gradYear: number) => {
    const response = await api.get<Student[]>(`/Student/gradYear/${gradYear}`);
    return response.data;
  };
  
  export const getStudentsByInstrument = async (instrument: string) => {
    const response = await api.get<Student[]>(`/Student/instrument/${instrument}`);
    return response.data;
  };
  
  export const getStudentVideos = async (id: string) => {
    const response = await api.get<Video[]>(`/Student/${id}/videos`);
    return response.data;
  };
  
  export const getStudentRatings = async (id: string) => {
    const response = await api.get<Rating[]>(`/Student/${id}/ratings`);
    return response.data;
  };
  
  export const getStudentComments = async (id: string) => {
    const response = await api.get<Comment[]>(`/Student/${id}/comments`);
    return response.data;
  };
  
  export const getStudentOffers = async (id: string) => {
    const response = await api.get<Offer[]>(`/Student/${id}/offers`);
    return response.data;
  };