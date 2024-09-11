import Offer from '../models/Offer';
import Rating from '../models/Rating';
import Student from '../models/Student';
import { Video } from '../models/Video';
import api from './apiConfig';

export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/Student');
  return response.data;
};

export const getStudentProfile = async (studentId: string): Promise<Student> => {
  const response = await api.get<Student>(`/Student/${studentId}`);
  console.log("getStudentById...studentId", studentId)
  console.log("getStudentById", response.data)
  return response.data;
};

export const getStudentsByRecruiter = async (recruiterId: string) => {
  const response = await api.get(`/Offer/recruiter/${recruiterId}/students`);
  return response.data;
};
export const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
  const response = await api.post<Student>('/Student', studentData);
  return response.data;
};

export const getAllStudents = async () => {
  const response = await api.get(`/Student`);
  return response.data;
};

export const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
  const response = await api.put<Student>(`/Student/${studentId}`, studentData);
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

export const sendOffer = async (recruiterId: string, studentId: string) => {
  return await api.post(`/Recruiter/${recruiterId}/offers`, { studentId });
};

// Add rating to a student's profile
export const addStudentRating = async (studentId: string, rating: number, comment: string): Promise<void> => {
  await api.post(`/Student/${studentId}/ratings`, { rating, comment });
};

export const rateStudent = async (studentId: string, score: number) => {
  const recruiterId = localStorage.getItem("userId");
  const response = await api.post(`/Rating/student/${studentId}/rate`, {
    recruiterId,
    score,
  });
  return response.data;
};