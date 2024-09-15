import React, { useEffect, useState } from "react";
import { getStudentsByRecruiter } from "../../services/studentService"; // API service
import Student from "../../models/Student"; // Student model
import Navbar from '../Common/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface RecruiterStudentListProps {
  recruiterId: string;
}

const RecruiterStudentList: React.FC<RecruiterStudentListProps> = ({ recruiterId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentsByRecruiter(recruiterId);
        setStudents(response);
      } catch (err) {
        setError(`Failed to fetch students: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [recruiterId]);

  const handleStudentProfile = async (studentId:string) => {
    try {
      navigate(`/students/${studentId}`)
    } catch (error) {
     console.log(error)
      alert("Failed to get student profile");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {/* Display skeleton loaders during loading */}
          {Array(8).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
    return (
      <div>
        <Navbar />
        <p className="text-red-500 text-center mt-6">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            students.map((student) => (
              <Card key={student.id} className="rounded-lg shadow-lg">
                <CardHeader>
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={student.profilePicture} alt={student.firstName} />
                    <AvatarFallback>{student.firstName.charAt(0)}{student.lastName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-bold">
                    {student.firstName} {student.lastName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Instrument: {student.instrument}</p>
                  <p className="text-sm text-gray-600">Graduation Year: {student.graduationYear}</p>
                  <p className="text-sm text-gray-600">School: {student.highSchool}</p>
                  <Button onClick={() => handleStudentProfile(student.id)} variant="default" className="mt-4 w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterStudentList;
