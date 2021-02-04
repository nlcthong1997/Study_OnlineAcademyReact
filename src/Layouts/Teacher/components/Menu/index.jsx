import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import ItemMenu from '../ItemMenu';

const Menu = () => {
  const itemsName = [
    {
      name: 'Thông tin cá nhân',
      key: 'info',
      uri: ''
    },
    {
      name: 'Đổi mật khẩu',
      key: 'change-pass',
      uri: '/change-password'
    },
    {
      name: 'Thêm khóa học',
      key: 'add',
      uri: '/add-course'
    },
    {
      name: 'Chỉnh sửa khóa học',
      key: 'edit',
      uri: '/edit-course'
    }
  ];
  const currentPath = window.location.pathname;
  const [keyActive, setKeyActive] = useState('');
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    switch (currentPath) {
      case `${match.path}/change-password`:
        setKeyActive('change-pass');
        break;
      case `${match.path}/add-course`:
        setKeyActive('add');
        break;
      case `${match.path}/edit-course`:
        setKeyActive('edit');
        break;
      default:
        setKeyActive('info');
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