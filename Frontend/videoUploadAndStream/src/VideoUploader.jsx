import React, { useState } from 'react';

function VideoUploader() {
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function uploadVideo(event) {
    setUploading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a video file.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://localhost:4000/video/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      setSuccessMessage('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setErrorMessage('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-4">
      <input
        type="file"
        id="file-input"
        className="mb-4"
        disabled={uploading}
      />
      <button
        onClick={uploadVideo}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
      {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
}

export default VideoUploader;
