import React from 'react';
import { Switch, Route } from "react-router-dom";

import Col from 'react-bootstrap/Col';

import Home from '../../../pages/Home';
import User from '../../../pages/User';
import PrivateRoute from '../../../components/PrivateRoute';

const Content = () => {
  return (
    <Col lg="9">
      <Switch>
        <Route path='/' exact component={Home} />
        <PrivateRoute path='/user'>
          <User />
        </PrivateRoute>
      </Switch>
    </Col >
  );
}

export default Content;