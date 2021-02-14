import React from 'react';
import { useHistory } from "react-router-dom";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const Course = ({ userCourse }) => {
  const history = useHistory();
  const uri = `/document/courses/${userCourse.courses_id}`;
  const onCourse_clicked = () => {
    history.push(uri);
  }
  return (
    <Row onClick={onCourse_clicked}>
      <Col lg={10}>
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
              <strong><Badge variant="success">Đã xem 16/20 bài</Badge>&nbsp; </strong>
            </p>
          </Media.Body>
        </Media>
      </Col>
      <Col lg={2}>
        <div>
          <i className="fa fa-heart-o fa-2x"></i>
        </div>
      </Col>
    </Row >
  );
}

export default Course;