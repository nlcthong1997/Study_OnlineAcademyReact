import React, { useContext, useEffect } from 'react';

import Course from './components/Course';
import Paginate from './components/Pagination';
import MenuFilter from './components/MenuFilter';
import Col from 'react-bootstrap/Col';

import AppContext from '../../AppContext';
import { INIT_HOME } from '../../AppTypes';
import { getAllCourses } from '../../services/course';

const Home = () => {
  const { store, dispatch } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      let courses = await getAllCourses();
      dispatch({
        type: INIT_HOME,
        payload: {
          courses,
        }
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Col lg={3} xs={12}>
        <MenuFilter />
      </Col>
      <Col lg={9} xs="12">
        {store.courses.map((course, i) => <Course key={i} course={course} />)}
        {<Paginate total={2} page={1} />}
      </Col>
    </>
  );
}

export default Home;