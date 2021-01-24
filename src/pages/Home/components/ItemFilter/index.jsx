import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';

const MenuFilter = ({ item, itemActive, onActive }) => {
  const onActive_clicked = () => {
    onActive(item.key);
  }

  return (
    <ListGroup.Item className="item" as="li" active={itemActive === item.key} onClick={onActive_clicked}>{item.name}</ListGroup.Item>
  );
}

export default MenuFilter;