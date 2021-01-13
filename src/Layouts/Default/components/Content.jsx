import React from 'react';
import { Switch, Route } from "react-router-dom";

import Col from 'react-bootstrap/Col';

import Home from '../../../pages/Home';

const Content = () => {
  return (
    <Col lg="9">
      <Switch>
        <Route path='/' exact component={Home} />
        {/* <Route path='/about' component={About} /> */}
      </Switch>
    </Col>
  );
}

export default Content;