// components/StudentsTable.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Student {
  studentId: string;
  name: string;
  instrument: string;
  averageRating: number;
  offersSent: number;
}

interface StudentsTableProps {
  students: Student[];
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Name</th>
          <th>Instrument</th>
          <th>Average Rating</th>
          <th>Offers Sent</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.studentId}>
            <td>{student.name}</td>
            <td>{student.instrument}</td>
            <td>{student.averageRating}</td>
            <td>{student.offersSent}</td>
            <td>
              <Link to={`/student/${student.studentId}`} className="text-blue-500 hover:underline">
                View Profile
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;
