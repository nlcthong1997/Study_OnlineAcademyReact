import React, { useContext } from 'react';

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import AppContext from '../../../AppContext';

import ListItem from './ListItem';

const Menu = (props) => {
  const { store } = useContext(AppContext);

  return (
    <Col lg="3">
      <ListGroup>
        <ListItem category={{ id: null, name: 'Nổi bật' }} />
        {
          store.categories.map((cat, i) => <ListItem key={i} category={cat} />)
        }
      </ListGroup>
    </Col>
  );
}

export default Menu;