import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const Course = ({ userCourse }) => {
  const history = useHistory();
  const uri = `/document/courses/${userCourse.courses_id}/videos`;
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
            src="https://instagram.fvca1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/145537201_3571859709549608_4714298037385496075_n.jpg?_nc_ht=instagram.fvca1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=3MG1sM-VDs8AX_fH_gn&tp=1&oh=776536750c36f14d2c302f91908bb9b8&oe=6041BE89"
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