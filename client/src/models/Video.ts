import { Student } from './Student';
import { Comment } from './Comment';
import { Rating } from './Rating';

export interface Video {
    videoId: number;
    videoUrl: string;
    title: string;
    description: string;
    uploadDate: string;
    studentId: string; // Reference to the student who uploaded the video
    student?: Student;
    comments?: Comment[]; // Comments on the video
    ratings?: Rating[]; // Ratings for the video
}
