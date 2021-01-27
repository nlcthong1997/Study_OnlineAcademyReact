import React, { useState } from 'react';
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
      name: 'Các khóa học của bạn',
      key: 'courses',
      uri: '/courses'
    },
    {
      name: 'Đổi mật khẩu',
      key: 'change-pass',
      uri: '/change-password'
    }
  ];
  const [itemActive, setItemActive] = useState('info');
  const history = useHistory();
  const match = useRouteMatch();

  const handleActive = (itemActive) => {
    setItemActive(itemActive.key);
    history.push(`${match.path}${itemActive.uri}`)
  }

  return (
    <ListGroup as="ul" variant="flush">
      {itemsName.map((item, idx) =>
        <ItemMenu key={idx} item={item} itemActive={itemActive} onActive={handleActive} />
      )}
    </ListGroup>
  );
}

export default Menu;