import React from 'react';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css';

const ModalVideo = ({ show, videoIntro, onCloseModal }) => {
  const handleClose = () => {
    onCloseModal();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{videoIntro.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-cus">
        <ReactPlayer url={videoIntro.url} playing={true} controls={true} width="100%" height="100%" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalVideo;