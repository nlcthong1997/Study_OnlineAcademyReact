import React from 'react';
import { Switch, useRouteMatch, Route } from "react-router-dom";

import Info from '../Info';
import RegisteredCourses from '../RegisteredCourses';
import ChangePassword from '../ChangePassword';

const Content = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <Info />
      </Route>

      <Route exact path={`${match.path}/registered-courses`}>
        <RegisteredCourses />
      </Route>

      <Route exact path={`${match.path}/change-password`}>
        <ChangePassword />
      </Route>
    </Switch>
  );
}

export default Content;