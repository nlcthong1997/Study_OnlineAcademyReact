import React, { useEffect, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header';
import Content from './components/Content';

import AppContext from '../../AppContext';
import { INIT_HOME } from '../../AppTypes';
import { getInitCategories } from '../../services/category';
import { getInitCourses } from '../../services/course';

import './index.css';

const Default = (props) => {

  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      let categories = await getInitCategories();
      let courses = await getInitCourses();

      dispatch({
        type: INIT_HOME,
        payload: {
          categories,
          courses
        }
      });
    }
    fetchData();
  }, [])


  return (
    <>
      <Header />
      <Container className="main">
        <Row>
          <Content />
        </Row>
      </Container>
    </>
  );
}

export default Default;