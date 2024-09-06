import React, { useEffect, useState, } from "react";
import { getAllStudents } from "../../services/studentService"; // API service
import { Student } from "../../models/Student"; // Student model
import Navbar from "../Common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllStudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<Students[]>([]);
  const navigate = useNavigate();



  const handleNavigation = (route: string) => {
    navigate(route);
    
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        setStudents(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleFilterChange = (
    criteria: keyof Student,
    value: string | number
  ) => {
    const filtered = students.filter((student) => student[criteria] === value);
    setFilteredStudents(filtered);
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div>
        <h2>All Students</h2>
        <div>
          <label>Filter by Instrument:</label>
          <select
            onChange={(e) => handleFilterChange("instrument", e.target.value)}
          >
            <option value="">All</option>
            <option value="Trumpet">Trumpet</option>
            <option value="Saxophone">Saxophone</option>
            <option value="Clarinet">Clarinet</option>
          </select>

          <label>Filter by Graduation Year:</label>
          <select
            onChange={(e) =>
              handleFilterChange("graduationYear", parseInt(e.target.value))
            }
          >
            <option value="">All</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                <Link
                  to={`/recruiter/student-profile/${student.id}`}
                  state={{ studentId: student.id }}
                ></Link>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      {student.firstName} {student.lastName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Instrument: {student.insturment}</Typography>
                    <Typography>High School: {student.highSchool}</Typography>
                    <Typography>
                      Graduation Year: {student.graduationYear}
                    </Typography>
                    <Typography>Rating:</Typography>
                    <Button onClick={() => handleNavigation(`/students/${student.id}`)} variant="contained" color="primary">
                      See Profile
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllStudentsList;