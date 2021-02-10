import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import ItemMenu from '../ItemMenu';

const Menu = () => {
  const itemsName = [
    {
      name: 'Tạo khóa học',
      key: 'add',
      uri: '/course/add'
    },
    {
      name: 'Thêm/Sửa bài giảng',
      key: 'lesson',
      uri: '/course/add-lesson'
    }
  ];
  const currentPath = window.location.pathname;
  const [keyActive, setKeyActive] = useState('');
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    switch (currentPath) {
      case `${match.path}/course/add-lesson`:
        setKeyActive('lesson');
        break;
      default:
        setKeyActive('add');
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