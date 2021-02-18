import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Swal from 'sweetalert2';
import './index.css';
import { LOGOUT } from '../../../../AppTypes';
import AppContext from '../../../../AppContext';
import { alertMessage } from '../../../../utils/common';
import { create } from '../../../../services/feedback';

const Course = ({ userCourse, onClickAddStart, onClickSubStart, loveIds }) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState(null);
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

  useEffect(() => {
    let mounted = true;
    if (isFeedback) {
      const sendFeedback = async () => {
        const res = await create(feedbackContent);
        if (mounted) {
          if (res.state) {
            setIsFeedback(false);
            alertMessage({ type: 'success', message: 'Gửi phản hồi thành công' });
          } else {
            setIsFeedback(false);
            alertMessage({ type: 'error', message: 'Gửi phản hồi thất bại' });
            if (res.auth !== undefined & res.auth.authenticated === false) {
              dispatch({
                type: LOGOUT,
                payload: {
                  isLogged: false
                }
              })
            }
          }
        }
      };
      sendFeedback();
    }

    return () => mounted = false;

  }, [isFeedback, feedbackContent])

  const onSendFeedback_clicked = async () => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Phản hồi',
      inputPlaceholder: 'Nhập phản hồi của bạn về khóa học...',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Gửi',
      showCancelButton: true
    })

    if (text) {
      let data = {
        courses_id: userCourse.courses_id,
        comment: text
      }
      setFeedbackContent(data);
      setIsFeedback(true);
    }
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
        <Row>
          <Col lg={6}>
            {loveIds.includes(userCourse.courses_id)
              ? <i className="fa fa-star fa-2x star" onClick={onStarSub_clicked}></i>
              : <i className="fa fa-star-o fa-2x star" onClick={onStarAdd_clicked}></i>
            }
          </Col>
          <Col lg={6}>
            <i className="fa fa-twitch fa-2x feedback" onClick={onSendFeedback_clicked}></i>
          </Col>
        </Row>
      </Col>
    </Row >
  );
}

export default Course;