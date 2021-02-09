import React from 'react';
import ReactPlayer from 'react-player';
import Badge from 'react-bootstrap/Badge';

import './index.css';

const Video = ({ video }) => {
  return (
    <div className="container-video">
      {video &&
        <>
          <h4><Badge variant="warning" className="title-video">{video.name}</Badge></h4>
          <ReactPlayer playing={true} controls={true} width="90%" height="90%" url={video.url} className="video" />
        </>
      }
    </div>
  );
}

export default Video;