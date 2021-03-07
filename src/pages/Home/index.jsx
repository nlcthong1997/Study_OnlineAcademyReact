import React, { useContext, useEffect } from 'react';

import Course from './components/Course';
import Paginate from '../../components/Paginate';
import MenuFilter from './components/MenuFilter';
import Col from 'react-bootstrap/Col';

import AppContext from '../../AppContext';
import { INIT_HOME, SEARCH_ACTION } from '../../AppTypes';
import { getAllCourses } from '../../services/course';
import { getDataPaginate } from '../../services/common';

import './index.css';

const Home = () => {
  const { store, dispatch } = useContext(AppContext);
  const isExist = store.courses.length > 0;

  useEffect(() => {
    if (!store.isSearchAction) {
      const fetchData = async () => {
        let { courses, paginate } = await getAllCourses();
        dispatch({
          type: INIT_HOME,
          payload: {
            courses,
            paginate
          }
        });
        dispatch({
          type: SEARCH_ACTION,
          payload: {
            isSearchAction: true
          }
        });
      }
      fetchData();
    }
  }, [store.isSearchAction]);

  const handlePageChange = async (url) => {
    let { courses, paginate } = await getDataPaginate(url);
    dispatch({
      type: INIT_HOME,
      payload: {
        courses,
        paginate
      }
    });
  }

  return (
    <>
      <Col lg={3} xs={12}>
        <MenuFilter />
      </Col>
      <Col lg={9} xs="12">
        <div className="list-course">
          {isExist
            ? store.courses.map((course, i) => <Course key={i} course={course} />)
            : <div>Không có khóa học phù hợp</div>
          }
        </div>
        {store.paginate.totalPages > 1 && <Paginate paginate={store.paginate} onPageChange={handlePageChange} />}
      </Col>
    </>
  );
}

export default Home;