import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from "react-router-dom";

import { getCourseById } from '../../services/course';

import Col from 'react-bootstrap/Col';

import MainImage from './components/MainImage';
import Detail from './components/Detail';
import ModalVideo from './components/ModalVideo';
import Recommend from './components/Recommend';

import Swal from 'sweetalert2';
import './index.css';
import Feedback from './components/Feedbback';

const Course = () => {
  let { courseId } = useParams();
  let [course, setCourse] = useState({});
  let [feedbacks, setFeedbacks] = useState([]);
  let [recommend, setRecommend] = useState([]);
  let [show, setShow] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    const fetchData = async () => {
      let res = await getCourseById(courseId);
      if (res.error) {
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Khóa học không tồn tại!',
          icon: 'warning',
          confirmButtonText: 'CLOSE'
        });
        history.replace(from);
      } else {
        setCourse(res.course);
        setFeedbacks(res.feedbacks);
        setRecommend(res.recommend);
      }
    }
    fetchData();
  }, []);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  return (
    <>
      <Col lg={4} xs={12}>
        <MainImage image={course.img_large} />
      </Col>

      <Col lg={8} xs={12}>
        <Detail course={course} onShowModal={handleShow} />
      </Col>

      <Col lg={12} xs={12}>
        <Recommend recommend={recommend} />
      </Col>

      <Col lg={12} xs={12}>
        <Feedback />
      </Col>

      <ModalVideo show={show} onCloseModal={handleClose} />
    </>
  );
}

export default Course;