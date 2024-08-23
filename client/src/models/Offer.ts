import { Band } from './Band';
import { Student } from './Student';
import { Recruiter } from './Recruiter';

export interface Offer {
    offerId: number;
    amount: number;
    status: 'Pending' | 'Accepted' | 'Declined'; // Enum-like string literal
    offerDate: string;
    offerBandId: number; // Reference to the band making the offer
    studentId: string; // Reference to the student receiving the offer
    recruiterId: string; // Reference to the recruiter making the offer
    band?: Band;
    student?: Student;
    recruiter?: Recruiter;
}
