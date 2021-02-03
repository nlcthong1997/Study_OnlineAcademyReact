import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header';
import Content from './components/Content';
import Footer from '../../components/Footer';

import './index.css';

const Teacher = () => {
  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-teach">
        <Row>
          <Content />
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Teacher;