import React, { useEffect, useState } from 'react';
import { getStudentVideos, uploadVideo } from '../../services/videoService';
import { Video } from '../../models/Video';
import Navbar from '../Common/Navbar';

const StudentVideoDashboard: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState<Partial<Video>>({
    title: '',
    description: '',
    videoUrl: '',
  });

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const studentVideos = await getStudentVideos(studentId);
        setVideos(studentVideos);
      } catch (err) {
        setError('Failed to load videos');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [studentId]);

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setUploadData({ ...uploadData, videoUrl: fileUrl });
    }
  };

  const handleUpload = async () => {
    if (!uploadData.title || !uploadData.videoUrl) {
      setError('Title and video file are required');
      return;
    }

    try {
      const newVideo = await uploadVideo(studentId, uploadData);
      setVideos([...videos, newVideo]);
      setUploadData({ title: '', description: '', videoUrl: '' });
      alert('Video uploaded successfully!');
    } catch (err) {
      setError('Failed to upload video');
      console.log(err)
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />

      <h1>Your Videos</h1>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.videoId} style={styles.videoContainer}>
            <h2>{video.title}</h2>
            <video width="320" height="240" controls>
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
            <p><strong>Uploaded on:</strong> {new Date(video.uploadDate).toLocaleDateString()}</p>

            <h3>Comments</h3>
            {video.comments && video.comments.length > 0 ? (
              <ul>
                {video.comments.map((comment) => (
                  <li key={comment.commentId}>
                    <p><strong>{comment.authorName}:</strong> {comment.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}

            <h3>Ratings</h3>
            {video.ratings && video.ratings.length > 0 ? (
              <ul>
                {video.ratings.map((rating) => (
                  <li key={rating.ratingId}>
                    <p><strong>Rating:</strong> {rating.ratingValue} / 5</p>
                    <p>{rating.comment ? `"${rating.comment}"` : ''}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ratings yet.</p>
            )}
          </div>
        ))
      ) : (
        <div>
          <p>You haven't uploaded any videos yet.</p>
          <h2>Upload Your First Video</h2>
          <div style={styles.uploadForm}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={uploadData.title}
              onChange={handleUploadChange}
              style={styles.input}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={uploadData.description}
              onChange={handleUploadChange}
              style={styles.textarea}
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUploadChange}
              style={styles.input}
            />
            <button onClick={handleUpload} style={styles.uploadButton}>Upload Video</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  videoContainer: {
    marginBottom: '40px',
  },
  uploadForm: {
    marginTop: '20px',
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    maxWidth: '500px',
  },
  textarea: {
    display: 'block',
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    maxWidth: '500px',
    height: '100px',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default StudentVideoDashboard;
