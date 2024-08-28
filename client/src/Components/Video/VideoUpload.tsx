import React, { useState } from 'react';
import api from '../../services/apiConfig';

interface VideoUploadProps {
  userId: string | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ userId }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`/student/${userId}/videos`, formData);
      alert('Video uploaded successfully');
    } catch (error) {
      console.error('Failed to upload video', error);
    }
  };

  return (
    <div>
      <h2>Upload a Video</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUpload;
