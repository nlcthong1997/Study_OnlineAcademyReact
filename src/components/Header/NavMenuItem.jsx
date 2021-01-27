import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AppContext from '../../AppContext';
import { INIT_HOME } from '../../AppTypes';
import { getCourseByCategoryId, getAllCourses } from '../../services/course';

const NavMenuItem = ({ category }) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const onItem_Clicked = async () => {
    //get current url
    history.push('/');
    let res
    let paginate = {
      totalItems: 0,
      totalPages: 0,
      limit: 0,
      qty: 0,
      currentPage: 0,
      uri: '',
      baseUrl: ''
    }

    if (category.id === null) {
      res = await getAllCourses();
    } else {
      res = await getCourseByCategoryId(category.id);
    }

    dispatch({
      type: INIT_HOME,
      payload: {
        courses: res.courses,
        paginate: res.paginate || paginate,
      }
    })
  }
  return (
    <NavDropdown.Item href="" onClick={onItem_Clicked}>{category.name}</NavDropdown.Item>
  );
}

export default NavMenuItem;