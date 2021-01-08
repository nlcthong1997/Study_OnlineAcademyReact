import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import Item from './Item';
import Home from '../../features/Home';
import AppContext from '../../AppContext';
import './index.css';

const Main = () => {
  const { store } = useContext(AppContext);
  return (
    <Container className="main">
      <Row>
        {/* MENU */}
        <Col lg="3">
          <ListGroup>
            <Item category={{ id: null, name: 'Nổi bật' }} />
            {
              store.categories.map((cat, i) => <Item key={i} category={cat} />)
            }
          </ListGroup>
        </Col>
        {/* CONTENT LAYOUT */}
        <Col lg="9">
          <Switch>
            <Route path='/' exact component={Home} />
            {/* <Route path='/about' component={About} /> */}
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;