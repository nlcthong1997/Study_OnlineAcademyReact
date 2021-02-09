import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ReactPlayer from 'react-player';

const VideoThumbNail = ({ video, onClickThumbnail }) => {
  const onThumbnail_clicked = () => {
    console.log('videoThumbnail_clicked');
    onClickThumbnail(video);
  }

  return (
    <ListGroup.Item onClick={onThumbnail_clicked} >
      <ReactPlayer url={video.url} width={225} height={125} />
      {video.name}
    </ListGroup.Item>
  );
}

export default VideoThumbNail;