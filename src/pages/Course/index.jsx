import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from "react-router-dom";

import { getCourseById } from '../../services/course';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import { formatToVND, ddmmyy } from '../../utils/format';

import Swal from 'sweetalert2';
import './index.css';

const Course = () => {
  let { courseId } = useParams();
  let [course, setCourse] = useState({});
  let [feedbacks, setFeedbacks] = useState([]);
  let [recommend, setRecommend] = useState([]);

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

  return (
    <>
      <Col lg={4} xs={12}>
        <Image className="img-main" style={{ width: '435px' }} src="https://instagram.fsgn8-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/141157764_865615847548484_302220013163179757_n.jpg?_nc_ht=instagram.fsgn8-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=PhiqWm5ULuQAX_l2oes&tp=1&oh=d33b0d37f6d9a7844413426997b8a8b9&oe=6035B667" rounded />
      </Col>
      <Col lg={8} xs={12}>
        <Jumbotron className="pt-0 pb-0 bg-l">
          <h1>{course.name}</h1>
          <p>
            <strong>{course.sort_desc}</strong>
          </p>
          <p>
            <Badge variant="warning">Điểm đánh giá</Badge>&nbsp;
            <span className="yellow w6 mr-3">
              {course.point_evaluate} <i className="fa fa-thumbs-o-up"></i>
            </span>&nbsp;
            <span className="w6">
              {course.qty_student_registed} học viên
            </span>
          </p>
          <p>
            <strong><i className="fa fa-graduation-cap"></i> Giáo viên: <span className="info">{course.teacher}</span></strong>
          </p>
          <p>
            <strong><i className="fa fa-cloud-upload"></i> Cập nhật: { }</strong>
          </p>
          <p>
            <h4><i className="fa fa-tag"></i> {formatToVND(course.price)}</h4>
          </p>
          <p>
            <Button variant="outline-info mr-3"><strong>Mua khóa học</strong></Button>
            <Button variant="outline-danger"><strong>Xem trước</strong></Button>
          </p>
          <hr />
          <h5>Chi tiết</h5>
          <p>{course.detail_desc} {course.detail_desc} {course.detail_desc}</p>
        </Jumbotron>
      </Col>
      <Col lg={12} xs={12}>
        <h4><span className=""><i class="fa fa-list-alt"></i> Các khóa học khác cho bạn</span></h4>
        <hr />
        <Row>
          {recommend.map((rcm, idx) =>
            <Col key={idx} lg={3}>
              <Card>
                <Card.Img className="img-main" variant="top" src="https://instagram.fsgn8-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/141157764_865615847548484_302220013163179757_n.jpg?_nc_ht=instagram.fsgn8-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=PhiqWm5ULuQAX_l2oes&tp=1&oh=d33b0d37f6d9a7844413426997b8a8b9&oe=6035B667" />
                <Card.Body>
                  <Card.Title>{rcm.name}</Card.Title>
                  <Card.Text>{rcm.detail_desc}</Card.Text>
                  <Card.Text>
                    <Badge variant="warning">Điểm đánh giá</Badge>&nbsp;
                    <span className="yellow w6 mr-3">
                      {rcm.point_evaluate} <i className="fa fa-thumbs-o-up"></i>
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <span className="danger"><i className="fa fa-tag"></i> <strong>{formatToVND(rcm.price)}</strong></span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Cập nhật: {ddmmyy(rcm.created_at)}</small>
                </Card.Footer>
              </Card>
            </Col>
          )}
        </Row>
      </Col>
    </>
  );
}

export default Course;