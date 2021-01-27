import React from 'react';
import { useHistory } from 'react-router-dom';

import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import './index.css';

const Course = ({ course }) => {
  const history = useHistory();

  const uri = `/courses/${course.id}`;

  const onItem_Clicked = () => {
    history.push(uri);
  }

  return (
    <Media className="home-course-media" onClick={onItem_Clicked}>
      <Image className="home-course-img mr-3" src="https://instagram.fsgn8-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/141157764_865615847548484_302220013163179757_n.jpg?_nc_ht=instagram.fsgn8-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=PhiqWm5ULuQAX_l2oes&tp=1&oh=d33b0d37f6d9a7844413426997b8a8b9&oe=6035B667" rounded />
      <Media.Body>
        <h5>{course.name}</h5>
        <h6>{course.title}</h6>
        <p>
          <strong><i className="fa fa-graduation-cap"></i> Giáo viên: <span className="info">{course.teacher}</span></strong>
        </p>
        <p>
          <Badge variant="warning">Điểm đánh giá</Badge>&nbsp;
          <span className="warning w6 mr-3">
            {course.point_evaluate} <i className="fa fa-thumbs-o-up"></i>
          </span>&nbsp;
        </p>
        {course.sort_desc && <p>{course.sort_desc}</p>}
      </Media.Body>
    </Media >
  );
}

export default Course;