import React, { useEffect, useState } from 'react';
import { getStudentById } from '../../services/studentService'; // Assuming this service exists
import Offer from '../../models/Offer';

interface OfferProps {
  offer: Offer;
}

const OfferComponent: React.FC<OfferProps> = ({ offer }) => {
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentName = async () => {
      if (offer.studentId) {
        try {
          const student = await getStudentById(offer.studentId); // Assuming this service fetches student by ID
          setStudentName(student.firstName + ' ' + student.lastName); // Concatenate first and last name
        } catch (error) {
          console.error('Failed to fetch student name:', error);
        }
      }
    };

    fetchStudentName();
  }, [offer.studentId]);

  return (
    <div>
      <p>Offer ID: {offer.offerId}</p>
      <p>Amount: ${offer.amount}</p>
      <p>Status: {offer.status}</p>
      <p>Offer Date: {offer.offerDate}</p>
      <p>Student Name: {studentName || 'Loading...'}</p> {/* Display student name */}
      {/* Other offer details */}
    </div>
  );
};

export default OfferComponent;
