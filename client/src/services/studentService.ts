import { Student } from '../models/Student';
import api from './apiConfig';

export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/students');
    return response.data;
};

export const getStudentById = async (studentId: string): Promise<Student> => {
    const response = await api.get<Student>(`/students/${studentId}`);
    return response.data;
};

export const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
    const response = await api.post<Student>('/students', studentData);
    return response.data;
};

export const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
    const response = await api.put<Student>(`/students/${studentId}`, studentData);
    return response.data;
};

export const deleteStudent = async (studentId: string): Promise<void> => {
    await api.delete(`/students/${studentId}`);
};