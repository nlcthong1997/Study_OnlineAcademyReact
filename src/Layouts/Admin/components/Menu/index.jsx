import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import ItemMenu from '../ItemMenu';

const Menu = () => {
  const itemsName = [
    {
      name: 'Danh sách khóa học',
      key: 'courses',
      uri: '/courses'
    },
    {
      name: 'Danh sách lĩnh vực',
      key: 'categories',
      uri: '/categories'
    },
    {
      name: 'Danh sách giảng viên',
      key: 'teachers',
      uri: '/teachers'
    },
    {
      name: 'Danh sách học viên',
      key: 'students',
      uri: '/students'
    },
    {
      name: 'Tạo giảng viên',
      key: 'create-teacher',
      uri: '/teachers/add'
    }
  ];
  const currentPath = window.location.pathname;
  const [keyActive, setKeyActive] = useState('');
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    switch (currentPath) {
      case `${match.path}/categories`:
        setKeyActive('categories');
        break;
      case `${match.path}/teachers`:
        setKeyActive('teachers');
        break;
      case `${match.path}/students`:
        setKeyActive('students');
        break;
      case `${match.path}/teachers/add`:
        setKeyActive('create-teacher');
        break;
      default:
        setKeyActive('courses');
        break;
    }
  }, [currentPath, match.path])

  const handleActive = (itemActive) => {
    setKeyActive(itemActive.key);
    history.push(`${match.path}${itemActive.uri}`)
  }

  return (
    <ListGroup as="ul" variant="flush">
      {itemsName.map((item, idx) =>
        <ItemMenu key={idx} item={item} keyActive={keyActive} onActive={handleActive} />
      )}
    </ListGroup>
  );
}

export default Menu;