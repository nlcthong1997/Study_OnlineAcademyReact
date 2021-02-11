import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import SlideThumbnail from '../SlideThumbnail';
import './index.css';

const ListSlide = ({ slides, onSlideActive }) => {
  const handleThumbnailClicked = (slide) => {
    onSlideActive(slide);
  }

  return (
    <ListGroup variant="flush" className={slides.length > 2 ? 'list-slide' : ''}>
      {slides.map((slide, idx) =>
        <SlideThumbnail key={idx} slide={slide} onClickThumbnail={handleThumbnailClicked} />
      )}
    </ListGroup>
  );
}

export default ListSlide;