import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AppContext from '../../AppContext';
import { CHANGE_HOME } from '../../AppTypes';
import { getCourseByCategoryId, getInitCourses } from '../../services/course';

const NavMenuItem = ({ category }) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const onItem_Clicked = async () => {
    //get current url
    history.push('/');

    let list = {};
    let paginate = {
      total: 0,
      qty: 0,
      page: 1
    };
    let isShowAll = true;


    if (category.id === null) {
      list = await getInitCourses();
    } else {
      const { courses, paginate } = await getCourseByCategoryId(category.id);
      list = courses;
      isShowAll = false
    }

    dispatch({
      type: CHANGE_HOME,
      payload: {
        courses: list,
        paginate,
        isShowAll
      }
    })
  }
  return (
    <NavDropdown.Item href="" onClick={onItem_Clicked}>{category.name}</NavDropdown.Item>
  );
}

export default NavMenuItem;