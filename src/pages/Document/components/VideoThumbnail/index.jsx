import React from 'react';
import ReactPlayer from 'react-player';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import './index.css';

const VideoThumbnail = ({ video, onShowVideo, videoActive }) => {
  const onTitle_clicked = () => {
    onShowVideo(video);
  }

  return (
    <ListGroup.Item onClick={onTitle_clicked} className="video-item">
      <ReactPlayer url={video.url} width={225} height={125} />
      <Badge variant="success">{video.name}</Badge>&nbsp;
      {videoActive && videoActive.id === video.id &&
        <Badge variant="warning" className="icon">
          <i className="fa fa-pause"></i>
        </Badge>
      }
    </ListGroup.Item>
  );
}

export default VideoThumbnail;