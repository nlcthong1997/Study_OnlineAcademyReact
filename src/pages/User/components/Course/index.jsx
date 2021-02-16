import React from 'react';
import { useHistory } from "react-router-dom";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import './index.css';

const Course = ({ userCourse, onClickAddStart, onClickSubStart, loveIds }) => {
  const history = useHistory();
  const uri = `/document/courses/${userCourse.courses_id}`;
  const onCourse_clicked = () => {
    history.push(uri);
  }

  const onStarAdd_clicked = () => {
    onClickAddStart(userCourse);
  }

  const onStarSub_clicked = () => {
    onClickSubStart(userCourse);
  }

  return (
    <Row className="col-course-registered">
      <Col lg={10} className="course-registered" onClick={onCourse_clicked}>
        <Media>
          <img
            width={125}
            height={125}
            className="align-self-start mr-3"
            src={userCourse.img}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>{userCourse.name}</h5>
            <h6>{userCourse.title}</h6>
            <p>
              <strong><i className="fa fa-graduation-cap"></i> Giáo viên: <span className="info">{userCourse.teacher}</span></strong>
            </p>
            <p>
              <strong><Badge variant="success">Đang xem bài {userCourse.process_courses_id}</Badge>&nbsp; </strong>
            </p>
          </Media.Body>
        </Media>
      </Col>
      <Col lg={2}>
        <div>
          {loveIds.includes(userCourse.courses_id)
            ? <i className="fa fa-star fa-2x star" onClick={onStarSub_clicked}></i>
            : <i className="fa fa-star-o fa-2x star" onClick={onStarAdd_clicked}></i>
          }
        </div>
      </Col>
    </Row >
  );
}

export default Course;