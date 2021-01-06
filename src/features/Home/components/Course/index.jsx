import React from 'react';
import Media from 'react-bootstrap/Media';
import './index.css';
import image from '../../../../imgs/logo-test.png'

const Course = ({ item }) => {
  return ( 
    <Media className="home-course-media">
      <img
        className="mr-3 home-course-img"
        src={image}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>Media Heading</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
          ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
          tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
          Donec lacinia congue felis in faucibus.
        </p>
      </Media.Body>
    </Media>
  );
}
 
export default Course;