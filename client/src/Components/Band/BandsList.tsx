import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/apiConfig";
import Navbar from "../Common/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast"; // For notifications

interface Band {
  bandId: number;
  bandName: string;
  schoolName: string;
}

const BandsList: React.FC = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Use the toast notification
  const navigate = useNavigate();

  // Fetch all bands from the API
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

  // Fetch bands on component mount
  useEffect(() => {
    fetchBands();
  }, [bands]);

  // Handle the show interest in a band
  const handleShowInterest = async (bandId: number) => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) {
      toast({
        title: "Error",
        description: "No student ID found",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.post(`/Student/${studentId}/interests`, {
        studentId: studentId,
        bandId: bandId,
      });
      toast({
        title: "Success",
        description: "Interest shown successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to show interest",
        variant: "destructive",
      });
    }
  };

  const navigateToBand = async (bandId: number) => {
    navigate(`/bands/${bandId}`);
  };

  // Render loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );

  // Render error state
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );

  return (


      <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Bands</h1>
          {bands.length > 0 ? (
            <ul className="space-y-4">
              {bands.map((band) => (
                <li key={band.bandId} className="flex justify-between items-center">
                  
                    {band.bandName} - {band.schoolName}
                  
                  <Button
                    onClick={() => handleShowInterest(band.bandId)}
                    className="w-half"
                  >
                    Show Interest
                  </Button>
                  <Button
                    onClick={() => navigateToBand(band.bandId)}
                    className="w-half"
                  >
                    Show Band Profile
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No bands available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default BandsList;
