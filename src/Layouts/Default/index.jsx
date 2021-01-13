import React, { useEffect, useReducer } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header';
import Menu from './components/Menu';
import Content from './components/Content';

import reducer from '../../AppReducer';
import AppContext from '../../AppContext';
import { INIT_HOME } from '../../AppTypes';
import { getInitCategories } from '../../services/category';
import { getInitCourses } from '../../services/course';

import './index.css';

const Default = (props) => {
  const initialState = {
    categories: [],
    courses: [],
    isShowAll: true
  }

  const [store, dispatch] = useReducer(reducer, initialState);

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
    <AppContext.Provider value={{ store, dispatch }}>
      <Header />
      <Container className="main">
        <Row>
          <Menu />
          <Content />
        </Row>
      </Container>
    </AppContext.Provider>
  );
}

export default Default;