// src/components/Bands/BandProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/apiConfig';

interface Band {
  bandId: number;
  name: string;
  schoolName: string;
  location: string;
  numberOfMembers: number;
}

const BandProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [band, setBand] = useState<Band | null>(null);

  useEffect(() => {
    const fetchBand = async () => {
      try {
        const response = await api.get<Band>(`/bands/${id}`);
        setBand(response.data);
      } catch (error) {
        console.error('Failed to fetch band details', error);
      }
    };

    fetchBand();
  }, [id]);

  if (!band) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{band.name}</h1>
      <p>School: {band.schoolName}</p>
      <p>Location: {band.location}</p>
      <p>Number of Members: {band.numberOfMembers}</p>
    </div>
  );
};

export default BandProfile;
