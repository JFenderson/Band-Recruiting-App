import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/apiConfig';

interface SendOfferFormProps {
  studentId: string;
}

const SendOfferForm: React.FC<SendOfferFormProps> = ({ studentId }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const recruiterId = localStorage.getItem('userId');
      const bandId = profile.bandId; // Assuming the recruiter is logged in and has a band ID stored in their profile
      const response = await api.post(`/Recruiter/${recruiterId}/offers`, {
        studentId,
        recruiterId,
        bandId,
        amount,
      });

      setStatus('Offer sent successfully');
      setAmount(0); // Reset the amount
    } catch (error: any) {
      console.error('Failed to send offer:', error);
      setError('Failed to send offer');
    }
  };

  return (
    <div>
      <h3>Send Offer</h3>
      {status && <p>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Send Offer</button>
      </form>
    </div>
  );
};

export default SendOfferForm;
