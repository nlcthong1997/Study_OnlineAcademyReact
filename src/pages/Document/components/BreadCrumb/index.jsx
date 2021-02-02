import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory, useParams, Link } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/user/registered-courses">Các khóa học của bạn</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadCrumb;