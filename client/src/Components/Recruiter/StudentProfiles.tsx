//Student Profiles: Viewing and rating student videos.
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getStudentProfile,
  addStudentRating,
} from "../../services/studentService";
import {  getOffersByStudentId } from "../../services/offerService";
import Student from "../../models/Student";
import Offer from "../../models/Offer";
import { Video } from "../../models/Video";
import api from "../../services/apiConfig";
import Navbar from "../Common/Navbar";

interface LocationState {
  studentId: string;
}

const StudentProfile: React.FC = () => {
  const location = useLocation<LocationState>();
  const studentId = location.state?.studentId;
  const [student, setStudent] = useState<Student | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [bandId, setBandId] = useState<string>(""); // Assuming the recruiter selects the band
  const [bandName, setBandName] = useState<string>(""); // The name of the band
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setError("Student ID not found");
      return;
    }
    console.log("student Id", studentId);

    const fetchStudent = async () => {
      try {
        const fetchedStudent = await api.get<Student>(`/student/${studentId}`);
        // const fetchedStudent = await getStudentProfile(studentId!);
        setStudent(fetchedStudent.data);
        setVideos(fetchedStudent.data.videos || []);
        setOffers(fetchedStudent.data.scholarshipOffers || [])
        console.log("student Id", studentId);
        const studentOffers = await getOffersByStudentId(studentId!);
        setOffers(studentOffers || []);
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleRatingSubmit = async () => {
    try {
      await addStudentRating(studentId!, rating, comment);
      alert("Rating submitted successfully!");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating.");
    }
  };


  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div>
        {student ? (
          <div>
            <h1>
              {student.firstName} {student.lastName}
            </h1>
            <p>
              <strong>Instrument:</strong> {student.instrument}
            </p>
            <p>
              <strong>High School:</strong> {student.highSchool}
            </p>
            <p>
              <strong>Graduation Year:</strong> {student.graduationYear}
            </p>

            <h2>Add a Rating</h2>
            <div>
              <label>
                Rating:
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min="1"
                  max="5"
                />
              </label>
              <textarea
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={handleRatingSubmit}>Submit Rating</button>
            </div>

            <h2>Send an Offer</h2>
            <div>
              <label>
                Band Name:
                <input
                  type="text"
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
              </label>
              <button >Send Offer</button>
            </div>

            <h2>Offers</h2>
            {offers.length > 0 ? (
              <ul>
                {offers.map((offer) => (
                  <li key={offer.offerId}>
                    <p>
                      <strong>Band:</strong> {offer.bandName}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${offer.amount}
                    </p>
                    <p>
                      <strong>Status:</strong> {offer.status}
                    </p>
                    <p>
                      <strong>Offer Date:</strong>{" "}
                      {new Date(offer.offerDate).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No offers yet.</p>
            )}

            <h2>Videos</h2>
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.videoId}>
                  <h3>{video.title}</h3>
                  <video width="320" height="240" controls>
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p>{video.description}</p>
                  <p>
                    <strong>Uploaded on:</strong>{" "}
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </p>

                  {/* Commenting and Rating Logic for Videos */}
                  <div>
                    <h4>Add Comment</h4>
                    {/* Implement the commenting logic here */}
                    <textarea placeholder="Add your comment" />
                    <button>Submit Comment</button>

                    <h4>Rate Video</h4>
                    {/* Implement the rating logic here */}
                    <input type="number" min="1" max="5" />
                    <button>Submit Rating</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No videos uploaded yet.</p>
            )}
          </div>
        ) : (
          <p>Loading student profile...</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
