import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/apiConfig";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (bands.length > 0) {
    return (
      <div>
        <h1>Bands</h1>
        <ul>
          {bands.map((band) => (
            <li key={band.bandId}>
              <Link to={`/bands/${band.bandId}`}>
                {band.bandName} - {band.schoolName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default BandsList;
