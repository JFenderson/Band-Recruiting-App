import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import api from "../../services/apiConfig";
import Offer from "../../models/Offer";
import Student from "../../models/Student";
import Navbar from "../Common/Navbar";
import Band from "../../models/Band";
import {Video} from "../../models/Video";
import Rating from "../../models/Rating";
import Comment from "../../models/Comment";
import StudentProfile from '../../models/Student'

import {getBands, getBandById } from "../../services/bandService";
import {getStudentVideos,getStudentOffers,} from "../../services/studentService";
import { acceptOffer, declineOffer } from "../../services/offerService";

import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog,DialogTrigger,DialogContent, DialogFooter,} from "../ui/dialog";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { StarIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStudentAverageRating, getStudentRatings } from "../../services/ratingService";

// StudentDashboard Component
const StudentDashboard: React.FC = () => {
  const { user: studentId } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Student | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [band, setBand] = useState<Band>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<StudentMetrics | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [selectedBand, setSelectedBand] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  // Fetch student data
  useEffect(() => {
    if (studentId) {
      loadDashboardData();
    }
  }, [studentId]);

  const loadDashboardData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No user ID found in localStorage");
        return;
      }
      const studentOffers = await getStudentOffers(userId);
      const studentVideos = await getStudentVideos(userId);
      const studentRatings = await getStudentRatings(userId);
      const studentAverageRating = await getStudentAverageRating(userId);
      const allBands = await getBands();
      setOffers(studentOffers);
      setVideos(studentVideos);
      setBands(allBands);
      setRatings(studentRatings);
      setAverageRating(studentAverageRating);
    } catch (error) {
      console.error("Failed to load student data:", error);
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "destructive",
      });
    }
  };

  const calculateAverageRating = (ratings: any[]): number => {
    if (ratings.length === 0) return 0;
    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    return totalScore / ratings.length;
  };

  // Accept or Decline Offers
  const handleAcceptOffer = async (offerId: string) => {
    try {
      await acceptOffer(studentId!, offerId);
      toast({
        title: "Success",
        description: "You have accepted the offer!",
        variant: "default",
      });
      loadDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept offer",
        variant: "destructive",
      });
    }
  };

  const handleDeclineOffer = async (offerId: string) => {
    try {
      await declineOffer(studentId!, offerId);
      toast({
        title: "Success",
        description: "You have declined the offer.",
        variant: "default",
      });
      loadDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline offer",
        variant: "destructive",
      });
    }
  };

  // Express Interest in a Band
  const handleExpressInterest = async (bandId: string) => {
    try {
      await expressInterestInBand(studentId, bandId);
      toast({
        title: "Success",
        description: "You have expressed interest in this band.",
        variant: "default",
      });
      loadDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to express interest in this band",
        variant: "destructive",
      });
    }
  };

  // Post a new video
  const handlePostVideo = async () => {
    try {
      await postStudentVideo(studentId, { videoUrl });
      toast({
        title: "Success",
        description: "Video uploaded successfully!",
        variant: "default",
      });
      loadDashboardData();
      setVideoUrl(""); // Reset input
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload video",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="flex justify-between items-center mt-4">
          {/* Metrics Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-bold">{videos.length}</p>
                <p>Videos Posted</p>
              </div>
              <div>
                <p className="text-lg font-bold">{offers.length}</p>
                <p>Offers Received</p>
              </div>
              <div>
                <p className="text-lg font-bold">{averageRating.toFixed(1)}</p>
                <p>Average Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Offers, Videos, and Bands */}
        <Tabs defaultValue="offers" className="mt-8">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="videos">My Videos</TabsTrigger>
            <TabsTrigger value="bands">Explore Bands</TabsTrigger>
          </TabsList>

          {/* Offers Section */}
          <TabsContent value="offers">
            {offers.length > 0 ? (
              offers.map((offer) => (
                <Card key={offer.offerId} className="mb-4">
                  <CardContent>
                    <h3 className="font-bold">{offer.bandName}</h3>
                    <p>Amount: ${offer.amount}</p>
                    <p>Status: {offer.status}</p>
                    <div className="mt-2">
                      <Button
                        variant="default"
                        onClick={() => handleAcceptOffer(offer.offerId)}
                        disabled={offer.status !== "Pending"}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        className="ml-2"
                        onClick={() => handleDeclineOffer(offer.offerId)}
                        disabled={offer.status !== "Pending"}
                      >
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No offers available yet.</p>
            )}
          </TabsContent>

          {/* Videos Section */}
          <TabsContent value="videos">
            <div>
              <h3 className="font-bold mb-4">My Videos</h3>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.videoId} className="mb-4">
                    <video src={video.videoUrl} controls className="w-full" />
                  </div>
                ))
              ) : (
                <p>No videos uploaded yet.</p>
              )}
            </div>
            {/* Post Video */}
            <div className="mt-4">
              <Input
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Button className="mt-2" onClick={handlePostVideo}>
                Post Video
              </Button>
            </div>
          </TabsContent>

          {/* Bands Section */}
          <TabsContent className="h-[calc(100vh-24rem)] overflow-y-auto pr-2" value="bands">
            <h3 className="font-bold mb-4">Explore Bands</h3>
            {bands.length > 0 ? (
              bands.map((band) => (
                <Card key={band.bandId} className="mb-4">
                  <CardContent>
                    <h3 className="font-bold">{band.name}</h3>
                    <p>{band.schoolName}</p>
                    <p>Location: {band.location}</p>
                    <Button
                      onClick={() => handleExpressInterest(band.bandId)}
                      className="mt-2"
                    >
                      Express Interest
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No bands available for now.</p>
            )}
          </TabsContent>
        </Tabs>
      </header>
    </div>
  );
};

export default StudentDashboard;
