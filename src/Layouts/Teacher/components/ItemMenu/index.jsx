import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const ItemMenu = ({ item, keyActive, onActive }) => {
  const onActive_clicked = () => {
    onActive(item);
  }

  return (
    <ListGroup.Item
      className="item"
      as="li"
      active={keyActive === item.key}
      onClick={onActive_clicked}
    >
      {item.name}
    </ListGroup.Item>
  );
}

export default ItemMenu;