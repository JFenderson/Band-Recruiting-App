import Band  from './Band';
import Student  from './Student';

export default interface Interest {
    interestId: number;
    studentId: string; // Reference to the interested student
    bandId: number; // Reference to the band of interest
    isInterested: boolean;
    interestDate: string;
    student?: Student;
    band?: Band;
}
