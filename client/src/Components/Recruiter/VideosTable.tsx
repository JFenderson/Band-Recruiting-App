// components/VideosTable.tsx
import React from "react";

interface Video {
  videoId: string;
  title: string;
  studentName: string;
  rating: number;
  dateReviewed: string;
}

interface VideosTableProps {
  videos: Video[];
  onRate: (videoId: string) => void;
  onLike: (videoId: string) => void;
}

const VideosTable: React.FC<VideosTableProps> = ({ videos, onRate, onLike }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Title</th>
          <th>Student</th>
          <th>Rating</th>
          <th>Date Reviewed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {videos.map((video) => (
          <tr key={video.videoId}>
            <td>{video.title}</td>
            <td>{video.studentName}</td>
            <td>{video.rating}</td>
            <td>{new Date(video.dateReviewed).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onRate(video.videoId)} className="text-blue-500 hover:underline">
                Rate
              </button>
              <button onClick={() => onLike(video.videoId)} className="text-green-500 hover:underline ml-2">
                Like
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VideosTable;
