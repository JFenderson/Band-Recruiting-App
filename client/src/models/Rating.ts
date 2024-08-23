import { Video } from './Video';
import { Recruiter } from './Recruiter';

export interface Rating {
    ratingId: number;
    score: number; // Scale from 1 to 5
    ratingDate: string;
    videoId: number; // Reference to the video being rated
    recruiterId: string; // Reference to the recruiter giving the rating
    video?: Video;
    recruiter?: Recruiter;
}
