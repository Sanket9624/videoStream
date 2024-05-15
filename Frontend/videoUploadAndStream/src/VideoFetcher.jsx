import React, { useEffect, useState } from 'react';

function VideoFetcher() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('http://localhost:4000/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {videos.map((videoUrl, index) => (
        <video
          key={index}
          src={videoUrl}
          controls
          className="border border-gray-300 rounded shadow-md hover:shadow-lg"
          width={320}
          height={240}
        />
      ))}
    </div>
  );
}

export default VideoFetcher;
