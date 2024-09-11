import React, { useEffect, useState } from "react";
import {
  createOffer,
  getOffersByStudentId,
  updateOffer,
} from "../../services/offerService";
import Offer from "../../models/Offer";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile } from "../../services/studentService";
import Student from "../../models/Student";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useToast } from "../../hooks/use-toast";
import { Guid } from 'js-guid';
import api from "../../services/apiConfig";
import { getBandById } from "../../services/bandService";
import Band from "../../models/Band";
import RecruiterProfile from "../../models/Recruiter";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";


interface OfferManagementProps extends Record<string, string | undefined> {
  studentId: string;
  recruiterId?: string;
}

const OfferManagement: React.FC<OfferManagementProps> = ({ studentId, recruiterId }) => {
  const { userId } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [band, setBand] = useState<Band>(); 
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const { toast } = useToast();
const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  

  const fetchProfile = async () => {
    try {
      if (!recruiterId) {
        console.error("No user ID found in localStorage");
        return;
      }
      const response = await api.get<RecruiterProfile>(
        `/Recruiter/${recruiterId}`
      );
      const bandResponse = await getBandById(response.data.bandId);
      setBand(bandResponse);
      console.log("recrtuier", recruiterId);
    } catch (error) {
      console.error("Failed to fetch recruiter profile:", error);
    }
  };

  const handleCreateOffer = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "No user ID found.",
        variant: "destructive"
      });
      return;
    }

    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid offer amount.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const offerData: Partial<Offer> = {
        studentId: studentId!,
        offerId: Guid.newGuid().toString(),
        amount,
        bandId: band?.bandId,
        bandName: band?.name,
        status: "Pending",
        offerDate: new Date().toISOString(),
        recruiterId: userId ?? undefined,
      };

      console.log(offerData)
      await createOffer(userId, studentId!, offerData);
      toast({
        title: "Success",
        description: "Offer sent successfully!",
        variant: "default"
      });
      handleGetOffer()
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to send offer.",
        variant: "destructive"
      });
    }finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGetOffer = async () => {
    try {
      const fetchStudent = await getStudentProfile(studentId!);
      const fetchedOffers = await getOffersByStudentId(studentId!);
      console.log("Fetched offers:", fetchedOffers); 
      setStudent(fetchStudent);
      setOffers(fetchedOffers);
    } catch (error) {
      console.error("Error getting offer:", error);
    }
  };

  const handleUpdateOffer = async (offerId: string) => {
    try {
      const updatedOffer = await updateOffer(offerId!, {
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

  const handleDeleteOffer = async (offerId: string) => {
    if (!selectedOfferId) return; 
    try {
      console.log("Deleting offer with ID:", offerId);  // Log the offerId
    await api.delete(`/Recruiter/${offerId}/offer`);
    const fetchedOffers = await getOffersByStudentId(studentId!);
    setOffers(fetchedOffers);
    setSelectedOfferId(null);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to delete offer.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProfile();
    handleGetOffer();
  }, [studentId]);

  return (
    <div>
      <div className="my-8">
        <h1 className="text-2xl font-bold mb-4">
          Offers for {student?.firstName} {student?.lastName}
        </h1>

        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer) => (
              <Card key={offer.offerId}>
                <CardHeader>
                  <CardTitle>{offer.bandName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Status: {offer.status}</p>
                  <p>Offer Date: {new Date(offer.offerDate).toLocaleDateString()}</p>
                  <p>Amount: ${offer.amount}</p>

                  {offer.recruiterId === userId && (
                <div className="mt-4 space-x-2">
                  <Button onClick={() => handleUpdateOffer(offer.offerId)}>
                    Update Offer
                  </Button>

                  {/* Trigger the confirmation dialog for deleting an offer */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" onClick={() => setSelectedOfferId(offer.offerId)}>
                        Delete Offer
                      </Button>
                    </DialogTrigger>

                    {/* Confirmation dialog for deleting the offer */}
                    <DialogContent>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this offer? This action cannot be undone.
                      </DialogDescription>
                      <div className="flex justify-end mt-4 space-x-2">
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={() => handleDeleteOffer(offer.offerId)}>
                          Confirm
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No Offers Yet</p>
        )}
      </div>

      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount:
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <Button onClick={handleCreateOffer} disabled={loading}>
            {loading ? (
              <div className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Send Offer"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferManagement;
