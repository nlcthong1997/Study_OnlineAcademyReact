import React from 'react';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from '../../../../components/PrivateRoute';

import Home from '../../../../pages/Home';
import User from '../../../../pages/User';
import Course from '../../../../pages/Course';
import Document from '../../../../pages/Document';

const Content = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/courses/:courseId' exact component={Course} />
      <PrivateRoute path='/user'>
        <User />
      </PrivateRoute>
      <PrivateRoute path='/document/courses/:courseId/videos' exact>
        <Document />
      </PrivateRoute>
    </Switch>
  );
}

export default Content;