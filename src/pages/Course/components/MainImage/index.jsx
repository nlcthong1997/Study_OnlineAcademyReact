import React from 'react';
import Image from 'react-bootstrap/Image';

const MainImage = ({ image }) => {
  return (
    <Image className="main-img" src={image} rounded />
  );
}

export default MainImage;