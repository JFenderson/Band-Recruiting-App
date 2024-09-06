/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createOffer,
  deleteOffer,
  getOffersByStudentId,
  updateOffer,
} from "../../services/offerService";
import Offer from "../../models/Offer";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Common/Navbar";
import { getStudentProfile } from "../../services/studentService";
import Student from "../../models/Student";

interface OfferManagementParams extends Record<string, string | undefined> {
  studentId: string;
  recruiterId?: string;
}

const OfferManagement: React.FC = () => {
  const { studentId } = useParams<OfferManagementParams>(); // Retrieve studentId from the URL params
  const navigate = useNavigate();
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [bandId, setBandId] = useState<string>(""); // The recruiter's band ID
  const [bandName, setBandName] = useState<string>(""); // The name of the band
  const [offers, setOffers] = useState<Offer[]>([]);
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("No user ID Found in localStorage");
  }
  const handleCreateOffer = async () => {
    try {
      const offerData: Partial<Offer> = {
        studentId: studentId!,
        amount,
        bandId,
        bandName,
        status: "Pending",
        offerDate: new Date().toISOString(),
      };
      await createOffer(userId!, studentId!, offerData);
      alert("Offer sent successfully!");
      navigate(`/students/${studentId}`); // Redirect back to the student's profile page
    } catch (error) {
      console.error("Failed to send offer:", error);
      alert("Failed to send offer.");
    }
  };

  const handleGetOffer = async () => {
    try {
        const fetchStudent = await getStudentProfile(studentId!);
      const fetchedOffers = await getOffersByStudentId(studentId!);
      setStudent(fetchStudent);
      
      console.log("fetched Offers",fetchedOffers);
      if (fetchedOffers.length > 0) {
        console.log("offers by student:", {
          student: studentId,
          offers: fetchedOffers,
        });
        setOffers(fetchedOffers); // Set the first offer
      } else {
        console.log("offers by student:", {
          student: studentId,
          offers: fetchedOffers,
        });

        setOffers([]); // No offers found
      }
    } catch (error) {
      console.error("Error getting offer:", error);
    }
  };

  const handleUpdateOffer = async () => {
    try {
      const updatedOffer = await updateOffer(studentId!, {
        status: "Accepted",
      });
  
      setOffers((prevOffers) => 
        prevOffers.map((offer) => 
          offer.offerId === updatedOffer.offerId ? updatedOffer : offer
        )
      );
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  const handleDeleteOffer = async () => {
    try {
      await deleteOffer(studentId!);
      setOffers([]);
      console.log("Offer deleted successfully");
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  useEffect(() => {
    handleGetOffer();
  }, [studentId]);

  return (
    <div>
      <Navbar />
      <div>
        <h1>Offers for {student?.firstName} {student?.lastName}</h1>
        <button onClick={handleCreateOffer}>Create Offer</button>
        <button onClick={handleGetOffer}>Get Offer</button>
        <button onClick={handleUpdateOffer}>Update Offer</button>
        <button onClick={handleDeleteOffer}>Delete Offer</button>
        <div>

            {offers.length > 0 ? (
              <div>
                {offers.map((offer) => (
                    <div>
                        <h2>Offer Details:</h2>
                        <p>Band: {offer.bandName}</p>
                        <p>Details: ${offer.amount}.00</p>
                        <p>Status: {offer.status}</p>
                        <p><strong>Offer Date:</strong> {new Date(offer.offerDate).toLocaleDateString()}</p>
                    </div>
                ))}
              </div>  
            ): (
                <p>No Offers Yet</p>
            )}
        </div>
</div>
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
        <button onClick={handleCreateOffer}>Send Offer</button>
      </div>
    </div>
  );
};

export default OfferManagement;
