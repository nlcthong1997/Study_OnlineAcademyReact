import React from 'react';
import Button from 'react-bootstrap/Button';

const AddSlide = ({ onShowAddVideo }) => {
  const handleShowAddVideo = () => {
    onShowAddVideo();
  }
  return (
    <>
      <Button variant="outline-secondary" className="btn-add-video" onClick={handleShowAddVideo} >
        <i className="fa fa-video-camera"></i> Thêm Video
      </Button>
      &nbsp;
      <Button variant="secondary" className="btn-add-slide">
        <i className="fa fa-file-pdf-o"></i> Thêm Slide
      </Button>
    </>
  );
}

export default AddSlide;