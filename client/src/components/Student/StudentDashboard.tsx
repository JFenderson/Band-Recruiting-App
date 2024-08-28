import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiConfig";
import VideoUpload from "../Video/VideoUpload";
import Rating from '../../models/Rating'
import StudentProfile from "../../models/Student";
import {Interest} from "../../services/interestService";
import { getStudentInterests } from "../../services/interestService";
import { getStudentRatings } from '../../services/studentService';
import { Link } from "react-router-dom";

const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [rating, setRating] = useState<Rating[] | null>(null);
  const [interest, setInterests] = useState<Interest[] | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }
        const response = await api.get<StudentProfile>(`/Student/${userId}`);
        console.log("student dashboard user:", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch student profile", error);
      }
    };

    const fetchRating = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }
        const response = await getStudentRatings(userId);
        console.log('rating:', response)
        setRating(response);
      } catch (error) {
        console.error("Failed to fetch student rating", error);
      }
    };

    const fetchInterests = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }
        const response = await getStudentInterests(userId);
        console.log("Interests:", response.data)
        setInterests(response.data);
      } catch (error) {
        console.error("Failed to fetch interests", error);
      }
    };

    fetchInterests();
    fetchProfile();
    fetchRating();
  }, [user]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {profile.firstName} {profile.lastName}'s Profile
      </h1>
      <img
        src={profile.profilePicture}
        alt={`${profile.firstName} ${profile.lastName}`}
      />
      <p>Email: {profile.email}</p>
      <p>Graduation Year: {profile.graduationYear}</p>
      <p>Instrument: {profile.instrument}</p>
      <p>High School: {profile.highSchool}</p>
      <p>Rating: {rating ? `${rating} / 5` : "No rating yet"}</p>

      <VideoUpload userId={user} />
      <div>
        <h2>Student Interests</h2>
        <ul>
          {interest?.map((interestItem) => (
            <li key={interestItem.interestId}>
              Band ID: {interestItem.bandId}, Interested On:{" "}
              {new Date(interestItem.interestDate).toLocaleDateString()}
            </li>
          )) || <li>No interests found</li>}
        </ul>
      </div>
      <Link to="/profile-update">Update Student Profile</Link>
    </div>
  );
};

export default StudentProfilePage;
