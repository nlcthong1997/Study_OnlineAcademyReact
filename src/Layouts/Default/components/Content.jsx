import React from 'react';
import { Switch, Route } from "react-router-dom";

import Col from 'react-bootstrap/Col';

import Home from '../../../pages/Home';
import User from '../../../pages/User';
import Course from '../../../pages/Course';
import PrivateRoute from '../../../components/PrivateRoute';

const Content = () => {
  return (
    <Col lg="12" xs="12">
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/courses/:courseId' exact component={Course} />
        <PrivateRoute exact path='/user'>
          <User />
        </PrivateRoute>
      </Switch>
    </Col >
  );
}

export default Content;