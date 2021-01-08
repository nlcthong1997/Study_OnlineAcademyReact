import React from 'react';
import { useHistory } from 'react-router-dom';
import Media from 'react-bootstrap/Media';
import './index.css';
import image from '../../../../imgs/logo-test.png';

const Course = ({ course }) => {
  const history = useHistory();

  const uri = `/courses/${course.id}`;

  const onItem_Clicked = () => {
    history.push(uri);
  }

  return (
    <Media className="home-course-media" onClick={onItem_Clicked}>
      <img
        className="mr-3 home-course-img"
        src={image}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>{course.name}</h5>
        <h6>{course.title}</h6>
        <strong>Giáo viên: </strong>{course.teacher}<br />
        <strong>Điểm đánh giá: </strong>{course.point_evaluate}
        {course.sort_desc && <p>{course.sort_desc}</p>}
      </Media.Body>
    </Media>
  );
}

export default Course;