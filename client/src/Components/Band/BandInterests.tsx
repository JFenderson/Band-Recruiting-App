import React, { useEffect, useState } from 'react';
import api from '../../services/apiConfig';
import { Link } from 'react-router-dom';

interface Band {
  bandId: number;
  name: string;
  schoolName: string;
}

interface BandInterestsProps {
  userId: string | null;
}

const BandInterests: React.FC<BandInterestsProps> = ({ userId }) => {
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const response = await api.get<Band[]>(`/Student/${userId}/interests`);
        setBands(response.data);
      } catch (error) {
        console.error('Failed to fetch band interests', error);
      }
    };

    fetchBands();
  }, [userId]);

  return (
    <div>
      <h2>Bands You're Interested In</h2>
      <ul>
        {bands.map((band) => (
          <li key={band.bandId}>
            <Link to={`/bands/${band.bandId}`}>{band.name} - {band.schoolName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// import { addInterest } from '../../services/studentService';

// const handleInterest = async (bandId: number) => {
//     try {
//         const studentId = localStorage.getItem('userId');
//         if (studentId) {
//             await addInterest(studentId, bandId);
//             // Optionally, refetch interests or update UI
//         }
//     } catch (error) {
//         console.error('Failed to add interest', error);
//     }
// };

export default BandInterests;
