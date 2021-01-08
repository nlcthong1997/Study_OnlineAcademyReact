import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import AppContext from '../../AppContext';
import { CHANGE_HOME } from '../../AppTypes';
import { getCourseByCategoryId, getInitCourses } from '../../services/course';

const Item = ({ category }) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const onItem_Clicked = async () => {
    //get current url
    history.push('/');

    let courses = {};
    let isShowAll = true;

    if (category.id === null) {
      courses = await getInitCourses();
    } else {
      courses = await getCourseByCategoryId(category.id);
      isShowAll = false
    }

    dispatch({
      type: CHANGE_HOME,
      payload: {
        isShowAll,
        courses
      }
    })
  }

  return (
    <ListGroup.Item onClick={onItem_Clicked}>{category.name}</ListGroup.Item>
  );
}

export default Item;