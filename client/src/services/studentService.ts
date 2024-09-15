import Offer from '../models/Offer';
import Rating from '../models/Rating';
import Student from '../models/Student';
import { Video } from '../models/Video';
import api from './apiConfig';

export const getStudents = async (): Promise<Student[]> => {
  try {
    const response = await api.get<Student[]>('/Student');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw new Error('Unable to retrieve students. Please try again later.');
  }
};

export const getStudentProfile = async (studentId: string): Promise<Student> => {
  try {
    const response = await api.get<Student>(`/Student/${studentId}`);
    console.log("getStudentById...studentId", studentId)
    console.log("getStudentById", response.data)
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student profile:', error);
    throw new Error('Unable to retrieve student profile. Please try again later.');
  }
};

export const getStudentsByRecruiter = async (recruiterId: string) => {
  try {
    const response = await api.get(`/Offer/recruiter/${recruiterId}/students`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students by recruiter:', error);
    throw new Error('Unable to retrieve students for this recruiter. Please try again later.');
  }
};

export const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
  try {
    const response = await api.post<Student>('/Student', studentData);
    return response.data;
  } catch (error) {
    console.error('Failed to create student:', error);
    throw new Error('Unable to create student profile. Please check your input and try again.');
  }
};

export const getAllStudents = async () => {
  try {
    const response = await api.get(`/Student`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all students:', error);
    throw new Error('Unable to retrieve all students. Please try again later.');
  }
};

export const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
  try {
    const response = await api.put<Student>(`/Student/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Failed to update student:', error);
    throw new Error('Unable to update student profile. Please check your input and try again.');
  }
};

export const deleteStudent = async (studentId: string): Promise<void> => {
  try {
    await api.delete(`/Student/${studentId}`);
  } catch (error) {
    console.error('Failed to delete student:', error);
    throw new Error('Unable to delete student profile. Please try again later.');
  }
};

export const uploadStudentVideo = async (studentId: string, videoData: Video) => {
  try {
    const response = await api.post<Video>(`/Student/${studentId}/videos`, videoData);
    return response.data;
  } catch (error) {
    console.error('Failed to upload student video:', error);
    throw new Error('Unable to upload video. Please check your input and try again.');
  }
};

export const getStudentsByGradYear = async (gradYear: number) => {
  try {
    const response = await api.get<Student[]>(`/Student/gradYear/${gradYear}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students by graduation year:', error);
    throw new Error('Unable to retrieve students for this graduation year. Please try again later.');
  }
};

export const getStudentsByInstrument = async (instrument: string) => {
  try {
    const response = await api.get<Student[]>(`/Student/instrument/${instrument}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students by instrument:', error);
    throw new Error('Unable to retrieve students for this instrument. Please try again later.');
  }
};

export const getStudentVideos = async (id: string) => {
  try {
    const response = await api.get<Video[]>(`/Student/${id}/videos`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student videos:', error);
    throw new Error('Unable to retrieve student videos. Please try again later.');
  }
};

export const getStudentRatings = async (id: string) => {
  try {
    const response = await api.get<Rating[]>(`/Student/${id}/ratings`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student ratings:', error);
    throw new Error('Unable to retrieve student ratings. Please try again later.');
  }
};

export const getStudentOffers = async (id: string) => {
  try {
    const response = await api.get<Offer[]>(`/Student/${id}/offers`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student offers:', error);
    throw new Error('Unable to retrieve student offers. Please try again later.');
  }
};

export const sendOffer = async (recruiterId: string, studentId: string) => {
  try {
    return await api.post(`/Recruiter/${recruiterId}/offers`, { studentId });
  } catch (error) {
    console.error('Failed to send offer:', error);
    throw new Error('Unable to send offer. Please try again later.');
  }
};

export const addStudentRating = async (studentId: string, rating: number, comment: string): Promise<void> => {
  try {
    await api.post(`/Student/${studentId}/ratings`, { rating, comment });
  } catch (error) {
    console.error('Failed to add student rating:', error);
    throw new Error('Unable to add rating. Please try again later.');
  }
};

export const rateStudent = async (studentId: string, score: number) => {
  try {
    const recruiterId = localStorage.getItem("userId");
    const response = await api.post(`/Rating/student/${studentId}/rate`, {
      recruiterId,
      score,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to rate student:', error);
    throw new Error('Unable to rate student. Please try again later.');
  }
};