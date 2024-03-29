import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import VideoThumbnail from '../VideoThumbnail';
import './index.css';

const ListVideo = ({ videos, onVideoActive }) => {
  const handleThumbnailClicked = (video) => {
    onVideoActive(video);
  }

  return (
    <ListGroup variant="flush" className={videos.length > 2 ? 'list' : ''}>
      {videos.map((video, idx) =>
        <VideoThumbnail key={idx} video={video} onClickThumbnail={handleThumbnailClicked} />
      )}
    </ListGroup>
  );
}

export default ListVideo;