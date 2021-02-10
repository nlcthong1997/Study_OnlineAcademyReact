import React from 'react';
import Button from 'react-bootstrap/Button';

const EditSlide = ({ onShowEditVideo }) => {
  const handleShowEditVideo = () => {
    onShowEditVideo();
  }
  return (
    <>
      <Button variant="outline-secondary" className="btn-edit-video" onClick={handleShowEditVideo} >
        <i className="fa fa-video-camera"></i> Chỉnh sửa Video
      </Button>
      &nbsp;
      <Button variant="secondary" className="btn-edit-slide">
        <i className="fa fa-file-pdf-o"></i> Chỉnh sửa Slide
      </Button>
    </>
  );
}

export default EditSlide;