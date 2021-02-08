import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import ItemMenu from '../ItemMenu';

import AppContext from '../../../../AppContext';

import './index.css';

const Menu = () => {
  const itemsName = [
    {
      name: 'Thông tin cá nhân',
      key: 'info',
      uri: '',
      role: ['user', 'teacher']
    },
    {
      name: 'Đổi mật khẩu',
      key: 'change-pass',
      uri: '/change-password',
      role: ['user', 'teacher']
    },
    {
      name: 'Các khóa học của bạn',
      key: 'registered',
      uri: '/registered-courses',
      role: ['user']
    }
  ];
  const currentPath = window.location.pathname;
  const [keyActive, setKeyActive] = useState('');
  const history = useHistory();
  const match = useRouteMatch();
  const { store } = useContext(AppContext);

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
        item.role.includes(store.role) && <ItemMenu key={idx} item={item} keyActive={keyActive} onActive={handleActive} />
      )}
    </ListGroup>
  );
}

export default Menu;