import React, { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import './index.css';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { updateView } from '../../../../services/video';

const VideoThumbnail = ({ video, onShowVideo, videoActive }) => {
  const { dispatch } = useContext(AppContext);
  const [isUpdateView, setIsUpdateView] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isUpdateView && video.id !== undefined) {
      const onUpdateView = async () => {
        const res = await updateView(video.id);
        if (mounted) {
          setIsUpdateView(false);
          if (res.auth !== undefined && res.auth.authenticated === false) {
            dispatch({
              type: LOGOUT,
              payload: {
                isLogged: false
              }
            })
          }
        }
      }
      onUpdateView();
    }

    return () => mounted = false;

  }, [isUpdateView, video])

  const onTitle_clicked = () => {
    onShowVideo(video);
    setIsUpdateView(true);
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