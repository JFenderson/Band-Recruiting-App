import api from './apiConfig'; // Assuming axios instance is configured here

// Interface for Rating
interface Rating {
  ratingId: string;
  videoId?: string | null;
  studentId: string;
  recruiterId: string;
  score: number;
  ratingDate: string;
  comment?: string
}

// Submit a new rating for a student
export const submitStudentRating = async (studentId: string, recruiterId: string, rating: Partial<Rating>) => {
  try {
    console.log("ratig service", rating);
    const response = await api.post(`/Rating/student/${studentId}/rate`, rating);
    console.log("rating service", response.data)
    return response.data;
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

// Update an existing rating for a student
export const updateStudentRating = async (studentId: string, ratingId: string, updatedRating: Rating) => {
  try {
    const response = await api.put(`/Rating/student/${studentId}/rate/${ratingId}`, updatedRating);
    return response.data;
  } catch (error) {
    console.error('Error updating rating:', error);
    throw error;
  }
};

// Optionally, if you need to retrieve ratings
export const getStudentRatings = async (studentId: string) => {
  try {
    const response = await api.get(`/Rating/student/${studentId}/ratings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};
