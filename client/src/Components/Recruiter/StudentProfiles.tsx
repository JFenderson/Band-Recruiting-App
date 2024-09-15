import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { getStudentProfile, rateStudent } from "../../services/studentService";
import { getOffersByStudentId } from "../../services/offerService";
import { getStudentComments, addStudentComment } from "../../services/commentService"; // New services
import Student from "../../models/Student";
import Offer from "../../models/Offer";
import Comment from "../../models/Comment";
import { Video } from "../../models/Video";
import Navbar from "../Common/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { StarIcon, MusicIcon, GraduationCapIcon, DollarSignIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import { getStudentRatings, submitStudentRating } from "../../services/ratingService";
import { Guid } from "js-guid";
import Rating from "../../models/Rating";

const StudentProfile: React.FC = () => {
  const { userId } = useAuth();
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");  // Comment for the comment modal
  const [ratingComment, setRatingComment] = useState<string>("");  // Comment for the rating modal
  const [comments, setComments] = useState<Comment[]>([]);  // Comments on the student
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); // For video modal
  const [videoComment, setVideoComment] = useState<string>(""); // Comment on video
  const [videoLiked, setVideoLiked] = useState<boolean | null>(null); // Like/Dislike state

  useEffect(() => {
    if (!studentId) {
      setError("Student ID not found");
      return;
    }

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
        console.log("student rating", fetchStudentRating)
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
        setError("Failed to load student profile");
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleCommentSubmit = async () => {
    try {
      if (!userId) {
        toast({
          title: "Error",
          description: "No user ID found.",
          variant: "destructive"
        });
        return;
      }
      await addStudentComment(studentId!, userId!, comment);  // Pass the comment string directly
      const updatedComments = await getStudentComments(studentId!); // Fetch updated comments
      setComments(updatedComments || []);
      setComment("");  // Clear the comment input after submission
    } catch (error) {
      console.error("Failed to submit comment", error);
      alert("Failed to submit comment.");
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const ratingPayload: Partial<Rating> = {
        ratingId: Guid.newGuid().toString(),          // Generate a unique ID for the rating
        videoId: selectedVideo?.videoId,  // Video ID if rating a video
        studentId: studentId!,       // Student ID
        recruiterId: userId!,        // Recruiter ID (from auth context or state)
        score: rating,               // Rating score
        ratingDate: new Date().toISOString(),
        comment: comment // Current date
      };
      console.log("rating payload",ratingPayload);

      await submitStudentRating(studentId!,userId!, ratingPayload); // Pass ratingComment for the rating-specific comment
      alert("Rating submitted successfully!");
      if (comment) {
        await addStudentComment(studentId!, userId!, comment); // Send comment if exists
      }
      toast({ title: "Success", description: "Rating and comment submitted!", variant: "default" });
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating.");
      toast({ title: "Error", description: "Failed to submit rating or comment", variant: "destructive" });
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
        toast({ title: "Success", description: "Video comment and like/dislike submitted!", variant: "default" });
      }
    } catch (error) {
      console.error("Failed to submit video comment or like/dislike", error);
      toast({ title: "Error", description: "Failed to submit video comment or like/dislike", variant: "destructive" });
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
                  <AvatarImage src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
                  <AvatarFallback>{student.firstName[0]}{student.lastName[0]}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-center mt-4">{student.firstName} {student.lastName}</CardTitle>
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
                  <span className="text-muted-foreground">Graduation Year:</span>
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
                          <h3 className="text-lg font-semibold">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No videos uploaded yet.</p>
                  )}
                </TabsContent>
                <TabsContent value="offers">
                  {offers.length > 0 ? (
                    <div className="space-y-4">
                      {offers.map((offer) => (
                        <Card key={offer.offerId}>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">{offer.bandName}</h3>
                              <Badge variant={offer.status === 'Accepted' ? 'default' : 'secondary'}>
                                {offer.status}
                              </Badge>
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                                <span>${offer.amount}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Offer Date: {new Date(offer.offerDate).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No offers yet.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

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
                Please provide a rating for the student (required) and a comment (optional).
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
                  <p className="text-sm text-muted-foreground">Posted on {new Date(comment.commentDate).toLocaleDateString()}</p>
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
