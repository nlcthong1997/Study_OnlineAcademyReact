import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import './index.css';

const SlideThumbnail = ({ slide, onShowSlide, slideActive }) => {
  const onTitle_clicked = () => {
    onShowSlide(slide);
  }

  return (
    <ListGroup.Item onClick={onTitle_clicked} className="slide-item">
      <embed width="191" height="207" src={slide.url} type="application/pdf"></embed><br />
      <Badge variant="success">{slide.name}</Badge>&nbsp;
      {slideActive && slideActive.id === slide.id &&
        <Badge variant="warning" className="icon">
          <i className="fa fa-pause"></i>
        </Badge>
      }
    </ListGroup.Item>
  );
}

export default SlideThumbnail;