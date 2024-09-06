import Recruiter  from './Recruiter';
import  Offer  from './Offer';
import Interest  from './Interest';

export default interface Band {
    bandId: number;
    name: string;
    schoolName: string;
    location: string;
    numberOfMembers: number;
    createdAt: string;
    recruiters?: Recruiter[]; // List of recruiters associated with this band
    offers?: Offer[]; // List of offers associated with this band
    interestedStudents?: Interest[]; // List of students interested in this band
}
