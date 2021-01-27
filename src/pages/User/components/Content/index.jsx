import React from 'react';
import { Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from '../../../../components/PrivateRoute';
import Info from '../Info';
import Courses from '../Courses';
import ChangePassword from '../ChangePassword';

const Content = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute exact path={`${match.path}`}>
        <Info />
      </PrivateRoute>

      <PrivateRoute exact path={`${match.path}/courses`}>
        <Courses />
      </PrivateRoute>

      <PrivateRoute exact path={`${match.path}/change-password`}>
        <ChangePassword />
      </PrivateRoute>
    </Switch>
  );
}

export default Content;