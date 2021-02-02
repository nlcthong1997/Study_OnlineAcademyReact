import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import ItemMenu from '../ItemMenu';

import './index.css';

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
      name: 'Các khóa học của bạn',
      key: 'registered',
      uri: '/registered-courses'
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
      case `${match.path}/registered-courses`:
        setKeyActive('registered');
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