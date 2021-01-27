import React, { useContext, useEffect } from 'react';

import Course from './components/Course';
import Paginate from '../../components/Paginate';
import MenuFilter from './components/MenuFilter';
import Col from 'react-bootstrap/Col';


import AppContext from '../../AppContext';
import { INIT_HOME } from '../../AppTypes';
import { getAllCourses } from '../../services/course';
import { getDataPaginate } from '../../services/common';

const Home = () => {
  const { store, dispatch } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      let { courses, paginate } = await getAllCourses();
      dispatch({
        type: INIT_HOME,
        payload: {
          courses,
          paginate
        }
      });
    }
    fetchData();
  }, []);

  const handlePageChange = async (url) => {
    const res = await getDataPaginate(url);
    dispatch({
      type: INIT_HOME,
      payload: {
        courses: res.courses,
        paginate: res.paginate
      }
    });
  }

  return (
    <>
      <Col lg={3} xs={12}>
        <MenuFilter />
      </Col>
      <Col lg={9} xs="12">
        {store.courses.map((course, i) => <Course key={i} course={course} />)}
        {store.paginate.totalPages > 1 && <Paginate paginate={store.paginate} onPageChange={handlePageChange} />}
      </Col>
    </>
  );
}

export default Home;