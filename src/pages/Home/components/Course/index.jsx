import React from 'react';
import { useHistory } from 'react-router-dom';

import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import { formatToVND } from '../../../../utils/format';

import './index.css';

const Course = ({ course }) => {
  const history = useHistory();

  const uri = `/courses/${course.id}`;

  const onItem_Clicked = () => {
    history.push(uri);
  }

  return (
    <Media className="home-course-media" onClick={onItem_Clicked}>
      <Image className="home-course-img mr-3" src={course.img} rounded />
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
      {(course.price_promo > 0)
        ?
        <div>
          <strong className="price">{formatToVND(course.price_promo)}</strong><br />
          <strong className="discount-home">{formatToVND(course.price)}</strong>
        </div>
        :
        <div>
          <strong className="price">{formatToVND(course.price)}</strong>
        </div>
      }
    </Media >
  );
}

export default Course;