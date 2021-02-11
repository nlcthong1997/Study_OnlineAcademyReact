import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ReactPlayer from 'react-player';
import Badge from 'react-bootstrap/Badge';

const VideoThumbNail = ({ video, onClickThumbnail }) => {
  const onThumbnail_clicked = () => {
    onClickThumbnail(video);
  }

  return (
    <ListGroup.Item onClick={onThumbnail_clicked} >
      <ReactPlayer url={video.url} width={225} height={125} />
      <Badge variant="success">{video.name}</Badge>
    </ListGroup.Item>
  );
}

export default VideoThumbNail;