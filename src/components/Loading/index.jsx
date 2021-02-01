import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './index.css';

const Loading = () => {
  return (
    <div className="loading">
      <Spinner className="loader" animation="border" variant="secondary" />
    </div>
  );
}

export default Loading;