import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import  Student from "../../models/Student";
import StudentRating from "./StudentRating";

interface StudentCardProps {
    student: Student,
    studentId: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ studentId, student }) => {

    const navigate = useNavigate();
console.log("StudetId in StudentCard", student)
    const handleViewProfile = () => {
      // Navigate to the student's profile page and pass the studentId
      navigate(`/students/${studentId}`);
    };

    const handleSendOfferPage = () => {
        navigate(`/offer-management/${studentId}`)
    }

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      {student.profilePicture && (
        <CardMedia
          component="img"
          height="140"
          image={student.profilePicture}
          alt={`${student.firstName} ${student.lastName}`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {student.firstName} {student.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Instrument: {student.instrument}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          High School: {student.highSchool}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Graduation Year: {student.graduationYear}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Rating: <StudentRating averageRating={student.averageRating} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleViewProfile} size="small" color="primary">
          View Profile
        </Button>
        <Button onClick={handleSendOfferPage} size="small" color="secondary">
          View Offers
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
