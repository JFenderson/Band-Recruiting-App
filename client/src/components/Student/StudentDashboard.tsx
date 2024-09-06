/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiConfig";
import VideoUpload from "../Video/VideoUpload";
import Rating from "../../models/Rating";
import StudentProfile from "../../models/Student";
import { Interest } from "../../services/interestService";
import { getStudentInterests } from "../../services/interestService";
import { getStudentOffers, getStudentRatings } from "../../services/studentService";
import { Link } from "react-router-dom";
import ProfileIcon from "../Common/ProfileIcon";
import Navbar from "../Common/Navbar";
import Band from "../../models/Band";
import BandInterests from "../Band/BandInterests";
import Offer from "../../models/Offer";

const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [rating, setRating] = useState<Rating[] | null>(null);
  const [interest, setInterests] = useState<Interest[] | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  console.log('user in student dash', user)
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
        const studentOffers = await getStudentOffers(response.data.id);
        setOffers(studentOffers);
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
        console.log("rating:", response);
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
        console.log("Interests:", response.data);

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
      <Navbar />
      <div>
        <h1>
          <ProfileIcon
            firstName={profile.firstName}
            lastName={profile.lastName}
            profilePicture={profile.profilePicture}
            size={50}
          />
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
        <Link to={'student/videos'}>See Videos</Link>
        {/* <VideoUpload userId={user} /> */}
        <div>
        <h2>Your Offers</h2>
          {offers.length > 0 ? (
            <ul>
              {offers.map((offer) => (
                <li key={offer.offerId}>
                  <p><strong>Band:</strong> {offer.bandName}</p>
                  <p><strong>Amount:</strong> ${offer.amount}</p>
                  <p><strong>Status:</strong> {offer.status}</p>
                  <p><strong>Offer Date:</strong> {new Date(offer.offerDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No offers yet.</p>
          )}
        </div>
        <div>
          <h2>Student Interests</h2>
          <BandInterests userId={user} />
          <Link to="/bands">Show Bands to give Interest</Link>
        </div>
        <Link to="/profile-update">Update Student Profile</Link>
      </div>
    </div>
  );
};

export default StudentProfilePage;
