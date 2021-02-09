import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import VideoThumbnail from '../VideoThumbnail';
import './index.css';

const List = ({ videos, onVideoActive }) => {
  const handleThumbnailClicked = (video) => {
    console.log('list_thumbmail');
    onVideoActive(video);
  }

  return (
    <ListGroup variant="flush" className="list">
      {videos.map((video, idx) =>
        <VideoThumbnail key={idx} video={video} onClickThumbnail={handleThumbnailClicked} />
      )}
    </ListGroup>
  );
}

export default List;