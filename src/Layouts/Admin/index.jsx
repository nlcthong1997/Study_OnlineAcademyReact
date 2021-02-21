import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '../../components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from '../../components/Footer';

import './index.css';

const Admin = () => {
  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-admin">
        <Row>
          <Col lg={2} xs={12}>
            <Menu />
          </Col>
          <Col lg={10} xs={12}>
            <Content />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Admin;