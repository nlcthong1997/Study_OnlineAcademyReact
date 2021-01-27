import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
// import './index.css';

const ItemMenu = ({ item, itemActive, onActive }) => {
  const onActive_clicked = () => {
    onActive(item);
  }

  return (
    <ListGroup.Item className="item" as="li" active={itemActive === item.key} onClick={onActive_clicked}>{item.name}</ListGroup.Item>
  );
}

export default ItemMenu;