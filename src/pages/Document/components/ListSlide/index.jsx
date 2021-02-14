import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import SlideThumbnail from '../SlideThumbnail';
import './index.css'

const ListSlide = ({ slides, onShowSlideActive, slideActive }) => {
  const handleShowSlide = (slide) => {
    onShowSlideActive(slide)
  }
  return (
    <ListGroup variant="flush" className="list-slide">
      {slides.map((slide, idx) =>
        <SlideThumbnail key={idx} slideActive={slideActive} slide={slide} onShowSlide={handleShowSlide} />
      )}
    </ListGroup>
  );
}

export default ListSlide;