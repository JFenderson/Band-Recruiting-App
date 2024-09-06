import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { } from '../../services/offerService';
import { Offer } from '../../models/Offer';

const MakeOffer: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>(); // Retrieve studentId from the URL params
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(0);
  const [bandId, setBandId] = useState<string>(''); // The recruiter's band ID
  const [bandName, setBandName] = useState<string>(''); // The name of the band

  const handleSendOffer = async () => {
    try {
      const offerData: Partial<Offer> = {
        studentId: studentId!,
        amount,
        bandId,
        bandName,
        status: 'Pending',
        offerDate: new Date().toISOString(),
      };

    
      alert('Offer sent successfully!');
      navigate(`/students/${studentId}`); // Redirect back to the student's profile page
    } catch (error) {
      console.error('Failed to send offer:', error);
      alert('Failed to send offer.');
    }
  };

  return (
    <div>
      <h1>Make an Offer</h1>
      <div>
        <label>
          Band Name:
          <input
            type="text"
            value={bandName}
            onChange={(e) => setBandName(e.target.value)}
          />
        </label>
        <label>
          Band ID:
          <input
            type="text"
            value={bandId}
            onChange={(e) => setBandId(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleSendOffer}>Send Offer</button>
      </div>
    </div>
  );
};

export default MakeOffer;
