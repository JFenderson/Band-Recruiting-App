import { User } from './User';
import  Band  from './Band';
import  Offer  from './Offer';
import Comment from './Comment';
import Rating  from './Rating';

export default interface Recruiter extends User {
    bandId: number;
    firstName: string;
    lastName: string;
    phone: string;
    profilePicture?: string; // Optional
    createdAt: string;
    band?: Band; // Recruiter has an optional reference to Band
    offersMade?: Offer[]; // List of offers made by this recruiter
    comments?: Comment[]; // List of comments made by this recruiter
    ratings?: Rating[]; // List of ratings made by this recruiter
}
