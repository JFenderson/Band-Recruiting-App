/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiConfig";
import { Link, useLocation } from "react-router-dom";
import Students from "../../models/Student";
import RecruiterProfile from "../../models/Recruiter";
import Offer from "../../models/Offer";
import Student from "../../models/Student";
import Navbar from "../Common/Navbar";
import StudentProfilePage from "../Student/StudentDashboard";
import Band from "../../models/Band";
import { getBandById } from '../../services/bandService';

const RecruiterProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [students, setStudents] = useState<Students[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [band, setBand] = useState<Band>();
  const [filteredStudents, setFilteredStudents] = useState<Students[]>([]);
  const location = useLocation();


  console.log('user in recruiter dash', user)
  useEffect(() => {
    console.log('Navigated to:', location.pathname);
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if(!userId){
          console.error("No user ID Found in localStorage")
        }
        const response = await api.get<RecruiterProfile>(
          `/Recruiter/${userId}`
        );

        const fetchBandProfile = await getBandById(response.data.bandId);
        console.log("recruiter:", response.data.bandId);
        setBand(fetchBandProfile)
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch band profile", error);
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
        const recruiterId = localStorage.getItem('userId');
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
          console.error('Expected an array but got:', response.data);
          // Handle the case where data is not an array
          setOffers([]); // Or whatever makes sense in your context
        }
      } catch (error) {
        console.error('Failed to fetch offers:', error);
      }
    };

    fetchProfile();
    fetchStudents();
    fetchOffers();
  }, [user, location]);

  const handleFilterChange = (
    criteria: keyof Student,
    value: string | number
  ) => {
    const filtered = students.filter((student) => student[criteria] === value);
    setFilteredStudents(filtered);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1>
          {profile.firstName} {profile.lastName}'s Profile
        </h1>
        <p>Email: {profile.email}</p>
        <p>Band: {band?.name} at {band?.schoolName}</p>

        <h2>Students</h2>
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

        <ul>
          {filteredStudents.map((student) => (
            <li key={student.id}>
                
              <Link to={`/recruiter/student-profile/${student.id}`} state={{studentId: student.id}}> {student.lastName},{student.firstName}</Link>
              <Link to={`/offer-management/${student.id}`}> Offer</Link>
            </li>
          ))}
        </ul>

        <h2>Sent Offers</h2>
        {offers.length > 0 ? (
        <ul>
          {offers.map(offer => (
            <li key={offer.offerId}>
              {offer.studentId} - {offer.status} - ${offer.amount}.00
            </li>
          ))}
        </ul>

        ) : (
          <p>No offers sent yet.</p>
        )}
      </div>
    </div>
  );
};


export default RecruiterProfilePage;
