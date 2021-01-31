import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
// import Badge from 'react-bootstrap/Badge';
// import './index.css';

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
      {item.name} &nbsp;
      {/* {item.key === 'courses' && <Badge variant="light"> 9 </Badge>} */}
    </ListGroup.Item>
  );
}

export default ItemMenu;