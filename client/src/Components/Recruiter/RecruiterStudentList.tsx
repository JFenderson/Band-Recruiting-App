import React, { useEffect, useState } from "react";
import { getStudentsByRecruiter } from "../../services/studentService"; // API service
import  Student  from "../../models/Student"; // Student model
import Navbar from '../Common/Navbar';
import StudentCard from "../Common/StudentCard"; // The reusable StudentCard component
import { Grid, Container } from "@mui/material";

interface RecruiterStudentListProps {
  recruiterId: string;
}

const RecruiterStudentList: React.FC<RecruiterStudentListProps> = ({ recruiterId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentsByRecruiter(recruiterId);
        setStudents(response);
        setLoading(false);
      } catch (err) {
        setError(`"Failed to fetch students.${err}"`);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [recruiterId]);

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
    <Navbar />
    <Container>
    <Grid container spacing={3}>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
            <StudentCard student={student} studentId={student.id} />
          </Grid>
        ))
      )}
    </Grid>
  </Container>
    </div>
     
  );
};

export default RecruiterStudentList;
