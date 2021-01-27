import React from 'react';
import Col from 'react-bootstrap/Col';

import Menu from './components/Menu';
import Content from './components/Content';

const User = () => {
  return (
    <>
      <Col lg={3} xs={12}>
        <Menu />
      </Col>
      <Col lg={9} xs={12}>
        <Content />
      </Col>
    </>
  );
}

export default User;