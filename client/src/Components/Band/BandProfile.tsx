import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/apiConfig";
import Navbar from "../Common/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MapPin, Users, Award, Star } from "lucide-react";
import Band from '../../models/Band';
import Interest from "../../models/Interest";
import { getBandInterests } from "../../services/interestService";
import Student from "../../models/Student";

const BandProfile: React.FC = () => {
  const { userId, role } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [band, setBand] = useState<Band | null>(null); // Band object, not just ID
  const [bandId, setBandId] = useState<string | null>(null); // Separate bandId
  const [interestedStudents, setInterestedStudents] = useState<Student[] | null>(null);
  const [filteredStudentId, setFilteredStudentId] = useState<string | null>(null);
  // Fetch the recruiter's bandId if the user is a recruiter
  useEffect(() => {
    const fetchBandIdForRecruiter = async () => {
      if (role === "Recruiter" && userId) {
        try {
          const response = await api.get(`/Recruiter/${userId}`);
          setBandId(response.data.bandId); // Set the bandId
        } catch (error) {
          console.error("Failed to fetch recruiter's band ID", error);
        }
      }
    };

    fetchBandIdForRecruiter();
  }, [userId, role]);

  // Fetch the full band profile using the bandId
  useEffect(() => {
    const fetchBandDetails = async () => {
      if (bandId) {
        try {
          const response = await api.get<Band>(`/Bands/${bandId}`);
          // const fetchInterestedStudents = await api.get<Interest[]>(`/Bands/${bandId}/interestedStudents`);
          const fetchInterestedStudents = await getBandInterests(bandId);
          setBand(response.data); // Set the full band object
          setInterestedStudents(fetchInterestedStudents.data);
          console.log(fetchInterestedStudents.data)
        } catch (error) {
          console.error("Failed to fetch band details", error);
        }
      }
    };

    fetchBandDetails();
  }, [bandId]);

  const filteredInterestedStudents = filteredStudentId
    ? interestedStudents?.filter((student) => student.studentId === filteredStudentId)
    : interestedStudents;

  if (!interestedStudents) {
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{band?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{band?.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{band?.numberOfMembers} Members</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{band?.schoolName}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{band?.offers?.length} Offers Made</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recruiters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.isArray(band?.recruiters) && band.recruiters.length > 0 ? ( // Ensure recruiters is an array
                  band.recruiters.map((recruiter, index) => (
                    <div key={recruiter.id || `recruiter-${index}`} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={recruiter.profilePicture} alt={recruiter.id} />
                        <AvatarFallback>{recruiter.firstName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {recruiter.firstName} {recruiter.lastName}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recruiters found.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interested Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="secondary">{interestedStudents?.length || 0} Interested</Badge>
              </div>
              <div className="space-y-4">
                {Array.isArray(interestedStudents) && interestedStudents.length > 0 ? (
                  interestedStudents.map((student, index) => (
                    <div key={student.id || `student-${index}`} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.profilePicture} alt={student.firstName} />
                        <AvatarFallback>{student.firstName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{student.instrument}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No interested students found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BandProfile;
