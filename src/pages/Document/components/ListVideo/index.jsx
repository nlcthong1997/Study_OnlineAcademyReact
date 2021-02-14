import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import VideoThumbnail from '../VideoThumbnail';
import './index.css'

const ListVideo = ({ videos, onShowVideoActive, videoActive }) => {
  const handleShowVideo = (video) => {
    onShowVideoActive(video)
  }
  return (
    <ListGroup variant="flush" className="list-video">
      {videos.map((video, idx) =>
        <VideoThumbnail key={idx} videoActive={videoActive} video={video} onShowVideo={handleShowVideo} />
      )}
    </ListGroup>
  );
}

export default ListVideo;