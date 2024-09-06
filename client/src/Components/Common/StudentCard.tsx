import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import  Student from "../../models/Student";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
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
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View Profile
        </Button>
        <Button size="small" color="secondary">
          Send Offer
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
