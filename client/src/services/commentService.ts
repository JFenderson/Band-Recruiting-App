import { Guid } from 'js-guid';
import Recruiter from '../models/Recruiter';
import Student from '../models/Student';
import { Video } from '../models/Video';
import api from './apiConfig';


export interface Comment {
    commentId: string;
    content: string;
    commentDate: string;
    studentId: string; // Reference to the student whose video is commented on
    videoId?: string; // Reference to the video being commented on
    recruiterId: string; // Reference to the recruiter making the comment
    video?: Video;
    recruiter?: Recruiter;
    student?: Student;
}

export const addStudentComment = async (studentId: string, recruiterId: string, commentText: string) => {
    const commentData = {
      studentId,
      commentId: Guid.newGuid().toString(), // Generate a new GUID for comment ID
      commentDate: new Date().toISOString(), // Set current date and time
      recruiterId,
      commentText // Include the comment text
    };
  
    try {
      const response = await api.post(`/Comments/students/${studentId}/comments`, commentData);
      console.log("comment res", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to submit comment:", error);
      throw error;
    }
  };

  export const updateStudentComment = async (studentId: string, commentId: string, updatedComment: Comment) => {
    try {
      const response = await api.put(`/api/Comments/students/${studentId}/comments/${commentId}`, updatedComment);
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  };
  
  
  export const getStudentComments = async (studentId: string) => {
    try {
        const response = await api.get<Comment[]>(`/Comments/students/${studentId}/comments`);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
  };

