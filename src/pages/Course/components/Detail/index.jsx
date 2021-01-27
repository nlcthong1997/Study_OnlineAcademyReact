import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { formatToVND, ddmmyy } from '../../../../utils/format';

const Detail = ({ course, onShowModal }) => {
  const handleShow = () => {
    onShowModal();
  }

  return (
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
      <h4><i className="fa fa-tag"></i> {formatToVND(course.price)}</h4>
      <p>
        <Button variant="outline-info mr-3"><strong>Mua khóa học</strong></Button>
        <Button variant="outline-danger" onClick={handleShow}><strong>Xem trước</strong></Button>
      </p>
      <hr />
      <h5>Chi tiết</h5>
      <p>{course.detail_desc} {course.detail_desc} {course.detail_desc}</p>
    </Jumbotron>
  );
}

export default Detail;