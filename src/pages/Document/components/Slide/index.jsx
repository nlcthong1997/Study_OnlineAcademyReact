import React from 'react';
import Badge from 'react-bootstrap/Badge';

const Slide = ({ slide }) => {
  return (
    <div className="container-slide">
      {slide &&
        <>
          <h4><Badge variant="warning" className="title-slide">{slide.name}</Badge></h4>
          <embed width="991" height="800" src={slide.url} type="application/pdf"></embed>
        </>
      }
    </div>
  );
}

export default Slide;