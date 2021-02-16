import React, { useContext } from 'react';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from '../../../../components/PrivateRoute';

import Home from '../../../../pages/Home';
import User from '../../../../pages/User';
import Course from '../../../../pages/Course';
import Document from '../../../../pages/Document';

import { USER } from '../../../../AppTypes';
import AppContext from '../../../../AppContext';

const Content = () => {
  const { store } = useContext(AppContext);
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/courses/:courseId' exact component={Course} />
      <PrivateRoute path='/user'>
        <User />
      </PrivateRoute>
      {store.role === USER &&
        <PrivateRoute path='/document/courses/:courseId' exact>
          <Document />
        </PrivateRoute>
      }
    </Switch >
  );
}

export default Content;