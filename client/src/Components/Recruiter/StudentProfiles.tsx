import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getStudentProfile,
  addStudentRating,
  rateStudent
} from "../../services/studentService";
import { getOffersByStudentId } from "../../services/offerService";
import Student from "../../models/Student";
import Offer from "../../models/Offer";
import { Video } from "../../models/Video";
import Navbar from "../Common/Navbar";
import StudentRating from "../Common/StudentRating";
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    Button,
    Divider,
    Rating
  } from '@mui/material';

const StudentProfile: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>(); // Get studentId from URL params
  const [student, setStudent] = useState<Student | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [bandName, setBandName] = useState<string>(""); // The name of the band
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
    console.log("Student ID:", studentId);

      setError("Student ID not found");
      return;
    }
    console.log("Student ID:", studentId);

    const fetchStudent = async () => {
      try {
        const fetchedStudent = await getStudentProfile(studentId); // Fetch student profile from your API
        setStudent(fetchedStudent);
        setVideos(fetchedStudent.videos || []);
        const studentOffers = await getOffersByStudentId(studentId); // Fetch offers for the student
        setOffers(studentOffers || []);
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleRatingSubmit = async () => {
    try {
      await rateStudent(studentId!, rating);
      alert("Rating submitted successfully!");
    } catch (error) {
        console.error("Failed to submit rating:", error);
        alert("Failed to submit rating.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
}

  return (
    // <div>
        <Box sx={{ p: 4 }}>
<Navbar />
      <Grid container spacing={4}>
        {/* Profile Details */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar
                alt={student.firstName}
                src={student.profilePicture}
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <Typography variant="h5" align="center" gutterBottom>
              {student.firstName} {student.lastName}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              {student.instrument}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              {student.highSchool}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Graduation Year: {student.graduationYear}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <StudentRating averageRating={student.averageRating} />
            </Box>
          </Card>
        </Grid>

        {/* Profile Content (Videos and Offers) */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <Box key={video.videoId} mb={2}>
                    <video width="100%" controls>
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <Typography variant="subtitle1">{video.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {video.description}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No videos uploaded yet.</Typography>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Scholarship Offers
              </Typography>
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <Box key={offer.offerId} mb={2}>
                    <Typography variant="subtitle1">
                      Band: {offer.bandName}
                    </Typography>
                    <Typography variant="body2">
                      Amount: ${offer.amount}
                    </Typography>
                    <Typography variant="body2">
                      Status: {offer.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Offer Date: {new Date(offer.offerDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No offers yet.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button onClick={handleRatingSubmit} variant="contained" color="primary" sx={{ mx: 1 }}>
          Rate Student
        </Button>
        <Button variant="outlined" color="primary" sx={{ mx: 1 }}>
          Send Offer
        </Button>
      </Box>
    </Box>
      
  );
};

export default StudentProfile;
