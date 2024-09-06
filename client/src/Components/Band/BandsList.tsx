/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/apiConfig";
import Navbar from "../Common/Navbar";

interface Band {
  bandId: number;
  bandName: string;
  schoolName: string;
}

const BandsList: React.FC = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBands = async () => {
    try {
      const response = await api.get<Band[]>("/bands");
      setBands(response.data);
    } catch (err) {
      setError("Error fetching bands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBands();
  }, []);

  const handleShowInterest = async (bandId: number) => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) {
      console.error("No student ID found");
      return;
    }

    try {
      const response = await api.post(`/Student/${studentId}/interests`, {
        studentId: studentId, // Ensure this is being correctly passed
        bandId: bandId,
      });
      console.log("Interest added successfully", response);
      alert("Interest shown successfully");
    } catch (error) {
      console.error("Failed to show interest", error);
      alert("Failed to show interest");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div>
        <h1>Bands</h1>
        {bands.length > 0 ? (
          <ul>
            {bands.map((band) => (
              <li key={band.bandId}>
                <Link to={`/bands/${band.bandId}`}>
                  {band.bandName} - {band.schoolName}
                </Link>
                <button onClick={() => handleShowInterest(band.bandId)}>Show Interest</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bands available.</p>
        )}
      </div>
    </div>
  );
};

export default BandsList;
