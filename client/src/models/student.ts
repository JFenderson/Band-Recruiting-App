import { User } from './User';
import { Video } from './Video';
import { Offer } from './Offer';
import { Interest } from './Interest';

export interface Student extends User {
    firstName: string;
    lastName: string;
    phone: string;
    graduationYear: number;
    instrument: string;
    highSchool: string;
    profilePicture?: string; // Optional
    createdAt: string;
    videos?: Video[]; // List of videos uploaded by the student
    scholarshipOffers?: Offer[]; // List of offers received by the student
    interests?: Interest[]; // List of interests expressed by the student
}
