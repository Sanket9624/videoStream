import React from 'react'
import ReactDOM from 'react-dom/client'
import VideoFetcher from './VideoFetcher'
import VideoUploader from './VideoUploader'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VideoFetcher />
    <VideoUploader />
  </React.StrictMode>,
)
