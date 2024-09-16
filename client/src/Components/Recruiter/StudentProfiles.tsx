import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudentProfile } from "../../services/studentService";
import {
  getStudentRatings,
  submitStudentRating,
} from "../../services/ratingService";
import {
  getOffersByStudentId,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../../services/offerService";
import {
  getStudentComments,
  addStudentComment,
} from "../../services/commentService";
import Student from "../../models/Student";
import Offer from "../../models/Offer";
import Comment from "../../models/Comment";
import { Video } from "../../models/Video";
import Rating from "../../models/Rating";
import Navbar from "../Common/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import {
  StarIcon,
  MusicIcon,
  GraduationCapIcon,
  DollarSignIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import { Guid } from "js-guid";
import { Input } from "../ui/input";
import Band from "../../models/Band";
import { getBandById } from "../../services/bandService";
import { getRecruiterById } from "../../services/recruiterService";
import api from "../../services/apiConfig";

const StudentProfile: React.FC = () => {
  const { userId } = useAuth();
  const { studentId } = useParams<{ studentId: string }>();
  const [band, setBand] = useState<Band>();
  const [student, setStudent] = useState<Student | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(""); // Comment for the comment modal
  const [ratingComment, setRatingComment] = useState<string>(""); // Comment for the rating modal
  const [comments, setComments] = useState<Comment[]>([]); // Comments on the student
  const [error, setError] = useState<string | null>(null);
  const [offerAmount, setOfferAmount] = useState<number>(0);
  const { toast } = useToast();
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); // For video modal
  const [videoComment, setVideoComment] = useState<string>(""); // Comment on video
  const [videoLiked, setVideoLiked] = useState<boolean | null>(null); // Like/Dislike state
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [deleteOfferId, setDeleteOfferId] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setError("Student ID not found");
      return;
    }

    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }
        const response = await getRecruiterById(userId);
        const bandResponse = await getBandById(response.bandId);
        setBand(bandResponse);
      } catch (error) {
        console.error("Failed to fetch recruiter profile:", error);
      }
    };

    const fetchStudent = async () => {
      try {
        const fetchedStudent = await getStudentProfile(studentId);
        setStudent(fetchedStudent);
        setVideos(fetchedStudent.videos || []);
        const studentOffers = await getOffersByStudentId(studentId);
        setOffers(studentOffers || []);
        const studentComments = await getStudentComments(studentId); // Fetch comments
        setComments(studentComments || []);
        const fetchStudentRating = await getStudentRatings(studentId);
        console.log("student rating", fetchStudentRating);
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
        setError("Failed to load student profile");
      }
    };

    fetchProfile();
    fetchStudent();
  }, [studentId]);

  const handleCommentSubmit = async () => {
    try {
      if (!userId) {
        toast({
          title: "Error",
          description: "No user ID found.",
          variant: "destructive",
        });
        return;
      }
      await addStudentComment(studentId!, userId!, comment); // Pass the comment string directly
      const updatedComments = await getStudentComments(studentId!); // Fetch updated comments
      setComments(updatedComments || []);
      setComment(""); // Clear the comment input after submission
    } catch (error) {
      console.error("Failed to submit comment", error);
      alert("Failed to submit comment.");
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const ratingPayload: Partial<Rating> = {
        ratingId: Guid.newGuid().toString(), // Generate a unique ID for the rating
        videoId: selectedVideo?.videoId, // Video ID if rating a video
        studentId: studentId!, // Student ID
        recruiterId: userId!, // Recruiter ID (from auth context or state)
        score: rating, // Rating score
        ratingDate: new Date().toISOString(),
        comment: comment, // Current date
      };
      console.log("rating payload", ratingPayload);

      await submitStudentRating(studentId!, userId!, ratingPayload); // Pass ratingComment for the rating-specific comment
      alert("Rating submitted successfully!");
      if (comment) {
        await addStudentComment(studentId!, userId!, comment); // Send comment if exists
      }
      toast({
        title: "Success",
        description: "Rating and comment submitted!",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating.");
      toast({
        title: "Error",
        description: "Failed to submit rating or comment",
        variant: "destructive",
      });
    }
  };

  const handleVideoCommentSubmit = async () => {
    try {
      if (selectedVideo) {
        // API for comment on video
        await addStudentComment(selectedVideo.videoId, userId!, videoComment); // Video comment API
        // API for like/dislike on video
        if (videoLiked !== null) {
          await rateVideo(selectedVideo.videoId, userId!, videoLiked); // Like/Dislike API
        }
        toast({
          title: "Success",
          description: "Video comment and like/dislike submitted!",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Failed to submit video comment or like/dislike", error);
      toast({
        title: "Error",
        description: "Failed to submit video comment or like/dislike",
        variant: "destructive",
      });
    }
  };

  const handleOfferSubmit = async () => {
    try {
      if (editingOfferId) {
        // If editing an existing offer
        await updateOffer(editingOfferId, offerAmount );
        toast({
          title: "Success",
          description: "Offer updated successfully!",
          variant: "default",
        });
      } else {
        // Submitting a new offer
        const offerData: Partial<Offer> = {
          studentId: studentId!,
          offerId: Guid.newGuid().toString(),
          amount: offerAmount,
          bandId: band?.bandId,
          bandName: band?.name,
          status: "Pending",
          offerDate: new Date().toISOString(),
          recruiterId: userId ?? undefined,
        };

        await createOffer(userId!, studentId!, offerData);
        toast({
          title: "Success",
          description: "Offer submitted successfully!",
          variant: "default",
        });
      }
      const updatedOffers = await getOffersByStudentId(studentId!);
      setOffers(updatedOffers || []);
      setOfferAmount(0);
      setEditingOfferId(null); // Reset after submitting
    } catch (error) {
      console.error("Failed to submit offer", error);
      toast({
        title: "Error",
        description: "Failed to submit offer",
        variant: "destructive",
      });
    }
  };

  const handleEditOffer = (offerId: string, amount: number) => {
    setEditingOfferId(offerId);
    setOfferAmount(amount); // Set the amount to the current offer's amount
  };

  const handleDeleteOffer = async (offerId:string) => {
    try {
      if (deleteOfferId) {
        await api.delete(`/Offer/${offerId}`);
        toast({
          title: "Success",
          description: "Offer deleted successfully!",
          variant: "default",
        });
        const updatedOffers = await getOffersByStudentId(studentId!);
        setOffers(updatedOffers);
        setDeleteOfferId(null); // Reset delete state
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete offer.",
        variant: "destructive",
      });
    }
  };

  const StarRating = () => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  const recruiterOffer = offers.find((offer) => offer.recruiterId === userId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={student.profilePicture}
                    alt={`${student.firstName} ${student.lastName}`}
                  />
                  <AvatarFallback>
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-center mt-4">
                {student.firstName} {student.lastName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <MusicIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{student.instrument}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <GraduationCapIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{student.highSchool}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-muted-foreground">
                    Graduation Year:
                  </span>
                  <span>{student.graduationYear}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span>{student.averageRating?.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos and Offers */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="videos">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="offers">Scholarship Offers</TabsTrigger>
                </TabsList>
                <TabsContent value="videos">
                  {videos.length > 0 ? (
                    <div className="space-y-6">
                      {videos.map((video) => (
                        <div key={video.videoId} className="space-y-2">
                          <video className="w-full rounded-lg" controls>
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <h3 className="text-lg font-semibold">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {video.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      No videos uploaded yet.
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="offers">
                  {offers.length > 0 ? (
                    <div className="space-y-4">
                      {offers.map((offer) => (
                        <Card key={offer.offerId}>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">
                                {offer.bandName}
                              </h3>
                              <div className="flex items-center space-x-2">
                                {" "}
                                <DollarSignIcon
                                  className="w-4 h-4 text-muted-foreground"
                                  display={offer.amount}
                                />
                                <span>{offer.amount}</span>
                                {offer.recruiterId === userId && (
                                  <>
                                    <Button
                                      onClick={() =>
                                        handleEditOffer(
                                          offer.offerId,
                                          offer.amount
                                        )
                                      }
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        setDeleteOfferId(offer.offerId)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Offer Date:{" "}
                              {new Date(offer.offerDate).toLocaleDateString()}
                              <p>Status: {offer.status}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      No offers yet.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Offer Modal */}
        <div className="mt-8 flex justify-center space-x-4">
        <Dialog open={!!editingOfferId} onOpenChange={() => setEditingOfferId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingOfferId ? "Edit Offer" : "Make a New Offer"}</DialogTitle>
            </DialogHeader>
            <Input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(Number(e.target.value))}
              placeholder="Enter offer amount"
            />
            <DialogFooter>
              <Button onClick={handleOfferSubmit}>{editingOfferId ? "Update Offer" : "Submit Offer"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>

   {/* Conditionally render "Make an Offer" button */}
   {!recruiterOffer && (
          <div className="mt-8 flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Make an Offer</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Scholarship Offer</DialogTitle>
                </DialogHeader>
                <Input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  placeholder="Enter offer amount"
                />
                <DialogFooter>
                  <Button onClick={handleOfferSubmit}>Submit Offer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Dialog
          open={!!deleteOfferId}
          onOpenChange={() => setDeleteOfferId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <p>Do you want to delete this offer?</p>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={async () => await handleDeleteOffer(deleteOfferId!)}>
                Yes, Delete
              </Button>
              <Button onClick={() => setDeleteOfferId(null)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Comments and Rating Modals */}
        <div className="mt-8 flex justify-center space-x-4">
          {/* Unified Comment and Rating Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Rate & Comment on Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rate & Comment</DialogTitle>
                <DialogDescription>
                  Please provide a rating for the student (required) and a
                  comment (optional).
                </DialogDescription>
              </DialogHeader>
              <div className="flex space-x-2">
                <StarRating />
              </div>
              <Textarea
                placeholder="Leave a comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <DialogFooter>
                <Button onClick={handleRatingSubmit}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Display Comments */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Card key={index} className="mb-4">
                <CardContent>
                  <p>{comment.content}</p>
                  <p className="text-sm text-muted-foreground">
                    Posted on{" "}
                    {new Date(comment.commentDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
