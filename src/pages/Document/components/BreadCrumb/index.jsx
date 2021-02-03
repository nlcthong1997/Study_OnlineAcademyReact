import React from 'react';
import { Link } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadCrumb = ({ courseId }) => {
  return (
    <Breadcrumb>
      <li className="breadcrumb-item">
        <Link to="/user/registered-courses">Các khóa học của bạn</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={`/document/courses/${courseId}/videos`}>Nội dung</Link>
      </li>
    </Breadcrumb>
  );
}

export default BreadCrumb;