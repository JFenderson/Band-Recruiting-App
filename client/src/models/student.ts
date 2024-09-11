import { User } from './User';
import { Video } from './Video';
import Offer  from './Offer';
import Interest  from './Interest';
import Rating from './Rating';

export default interface Student extends User {
    firstName: string;
    lastName: string;
    phone: string;
    graduationYear: number;
    instrument: string;
    highSchool: string;
    profilePicture?: string; // Optional
    createdAt: string;
    averageRating?: number;
    videos?: Video[]; // List of videos uploaded by the student
    scholarshipOffers?: Offer[]; // List of offers received by the student
    interests?: Interest[]; 
    rating?: Rating[];// List of interests expressed by the student
}
