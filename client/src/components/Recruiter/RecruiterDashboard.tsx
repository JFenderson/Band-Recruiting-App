/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Students from "../../models/Student";
import RecruiterProfile from "../../models/Recruiter";
import Offer from "../../models/Offer";
import Student from "../../models/Student";
import Navbar from "../Common/Navbar";
import Band from "../../models/Band";
import { getBandById } from "../../services/bandService";
import Comment from "../../models/Comment";
import Rating from "../../models/Rating";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { StarIcon, MessageCircleIcon, UserIcon, UsersIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import OfferManagement from "./OfferManagement";

import Sidebar from "../Common/Sidebar";
import MetricsSection from "./MetricsSection";
import StudentsTable from "./StudentsTable";
import OffersTable from "./OffersTable";
import VideosTable from "./VideosTable";

const RecruiterProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [students, setStudents] = useState<Students[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [band, setBand] = useState<Band>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Students[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [videos, setVideos] = useState([]);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }
        const response = await api.get<RecruiterProfile>(
          `/Recruiter/${userId}`
        );
        const bandResponse = await getBandById(response.data.bandId);
        setBand(bandResponse);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch recruiter profile:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await api.get<Students[]>("/Student");
        console.log("students:", response.data);

        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize with all students
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    const fetchOffers = async () => {
      try {
        const recruiterId = localStorage.getItem("userId");
        const response = await api.get(`/recruiter/${recruiterId}/offers`);
        console.log(response.data); // Inspect the data structure
        if (Array.isArray(response.data)) {
          const offers = response.data.map((offer: Offer) => {
            return {
              ...offer,
              formattedDate: new Date(offer.offerDate).toLocaleDateString(),
            };
          });

          setOffers(offers);
        } else {
          console.error("Expected an array but got:", response.data);
          // Handle the case where data is not an array
          setOffers([]); // Or whatever makes sense in your context
        }
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const recruiterId = localStorage.getItem("userId");
        const response = await api.get<Comment[]>(
          `/recruiter/${recruiterId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    const fetchRatings = async () => {
      try {
        const recruiterId = localStorage.getItem("userId");
        const response = await api.get<Rating[]>(
          `/recruiter/${recruiterId}/ratings`
        );
        setRatings(response.data);
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
      }
    };

    fetchProfile();
    fetchStudents();
    fetchOffers();
    fetchComments();
    fetchRatings();
  }, [user, location]);

  const handleNavigation = (route: string) => {
    navigate(route);
  };
  const handleSearch = (searchTerm: string) => {
    const filtered = students.filter(
      (student) =>
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.highSchool.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleFilter = (type: string, value: string) => {
    const filtered = students.filter((student) => {
      if (type === "highSchool") return student.highSchool === value;
      if (type === "instrument") return student.instrument === value;
      return true;
    });
    setFilteredStudents(filtered);
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <MetricsSection
          totalOffers={offers.length}
          totalRatings={students.length}
          totalComments={videos.length}
          totalVideos={videos.length}
        />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Student Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Search students..."
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Select
                      onValueChange={(value) => handleFilter("location", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles</SelectItem>
                        <SelectItem value="chicago">Chicago</SelectItem>
                        <SelectItem value="miami">Miami</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) =>
                        handleFilter("instrument", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Instrument" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piano">Piano</SelectItem>
                        <SelectItem value="guitar">Guitar</SelectItem>
                        <SelectItem value="drums">Drums</SelectItem>
                        <SelectItem value="vocals">Vocals</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      className="w-full"
                      onClick={() => setFilteredStudents(students)}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[calc(100vh-24rem)] overflow-y-auto pr-2">
                    <div className="space-y-4">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Avatar>
                            <AvatarImage
                              src={student.profilePicture}
                              alt={student.firstName}
                            />
                            <AvatarFallback>
                              {student.firstName}
                              {student.lastName}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {student.firstName}
                              {student.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.highSchool} class of{" "}
                              {student.graduationYear}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.instrument}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-2/3">
              {selectedStudent ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Student Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          src={selectedStudent.profilePicture}
                          alt={selectedStudent.lastName}
                        />
                        <AvatarFallback>
                          {selectedStudent.firstName}
                          {selectedStudent.lastName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">
                          {selectedStudent.firstName}
                          {selectedStudent.lastName}
                        </h2>
                        <p className="text-gray-500">
                          {selectedStudent.instrument} |{" "}
                          {selectedStudent.highSchool}
                        </p>
                        <p className="text-gray-500">
                          Music School of New York
                        </p>
                      </div>
                    </div>
                    <Tabs defaultValue="video1">
                      <TabsList>
                        <TabsTrigger value="video1">Video 1</TabsTrigger>
                        <TabsTrigger value="video2">Video 2</TabsTrigger>
                      </TabsList>
                      <TabsContent value="video1">
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </TabsContent>
                      <TabsContent value="video2">
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="flex items-center space-x-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={
                            star <= 4 ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-sm text-gray-500">(4.0)</span>
                    </div>
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      className="mb-4"
                    />
                    <div className="flex justify-between">
                      <Button>
                        <MessageCircleIcon className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      {/* Offers Button */}
                      <div className="mt-4">
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button onClick={() => setIsDialogOpen(true)}>
                              View Offers
                            </Button>
                          </DialogTrigger>

                          {/* Modal for Offers */}
                          <DialogContent
                            aria-describedby="dialog-description"
                            className="max-w-lg max-h-[80vh] overflow-y-auto p-4 bg-white rounded-lg shadow-lg"
                            style={{ maxHeight: "80vh" }}
                          >
                            <DialogHeader>
                              <DialogTitle>
                                Manage Offers for {selectedStudent.firstName}{" "}
                                {selectedStudent.lastName}
                              </DialogTitle>
                              <DialogDescription>
                                Please enter the offer details for the selected
                                student. This information will be processed and
                                saved.
                              </DialogDescription>
                            </DialogHeader>

                            {/* Include OfferManagement as the popup content */}
                            <OfferManagement
                              studentId={selectedStudent.id}
                              recruiterId={profile.id}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex justify-end space-x-2 mt-4">
                  <p className="text-gray-500">
                    Select a student to view their profile
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterProfilePage;
