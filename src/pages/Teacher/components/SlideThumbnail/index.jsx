import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './index.css';

const SlideThumbNail = ({ slide, onClickThumbnail }) => {
  const onThumbnail_clicked = () => {
    onClickThumbnail(slide);
  }

  return (
    <ListGroup.Item className="slide-thumbnail" onClick={onThumbnail_clicked}>
      <embed width="191" height="207" src={slide.url} type="application/pdf"></embed><br />
      <Badge variant="success">{slide.name}</Badge>
    </ListGroup.Item>
  );
}

export default SlideThumbNail;