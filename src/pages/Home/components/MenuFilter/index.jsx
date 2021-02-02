import React, { useState, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import ItemFilter from '../ItemFilter';

import {
  getAllCourses,
  getSubscribedCourses,
  getMostViewCourses,
  getLatestCourses,
  getHighlightsCourses
} from '../../../../services/course';

import AppContext from '../../../../AppContext';
import { INIT_HOME } from '../../../../AppTypes';

import './index.css';

const MenuFilter = () => {
  const { dispatch } = useContext(AppContext);

  const itemsName = [
    { name: 'Mới nhất', key: 'new' },
    { name: 'Nổi bật nhất tuần', key: 'highlights' },
    { name: 'Xem nhiều nhất', key: 'most' },
    { name: 'Đăng ký nhiều nhất tuần qua', key: 'sub' },
    { name: 'Tất cả', key: 'all' }
  ];

  const [itemActive, setItemActive] = useState('all');
  const handleActive = async (keyActive) => {
    setItemActive(keyActive);
    let courses = []
    let paginate = {
      totalItems: 0,
      totalPages: 0,
      limit: 0,
      qty: 0,
      currentPage: 0,
      uri: '',
      baseUrl: ''
    }
    switch (keyActive) {
      case 'new':
        courses = await getLatestCourses();
        break;
      case 'highlights':
        courses = await getHighlightsCourses();
        break;
      case 'most':
        courses = await getMostViewCourses();
        break;
      case 'sub':
        courses = await getSubscribedCourses();
        break;
      default:
        let res = await getAllCourses();
        courses = res.courses || courses;
        paginate = res.paginate || paginate;
    }
    dispatch({
      type: INIT_HOME,
      payload: {
        courses,
        paginate
      }
    })
  }

  return (
    <ListGroup as="ul" variant="flush">
      {itemsName.map((item, idx) =>
        <ItemFilter key={idx} item={item} itemActive={itemActive} onActive={handleActive} />
      )}
    </ListGroup>
  );
}

export default MenuFilter;