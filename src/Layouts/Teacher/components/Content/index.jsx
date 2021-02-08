import React, { useContext } from 'react';
import { Switch, Redirect, useLocation } from "react-router-dom";

import AppContext from '../../../../AppContext';
import { TEACHER } from '../../../../AppTypes';

import PrivateRoute from '../../../../components/PrivateRoute';
import Lesson from '../../../../pages/Teacher/components/Lesson';
import Add from '../../../../pages/Teacher/components/Add';

const Content = () => {
  const { store } = useContext(AppContext);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  return (
    <>
      {store.role !== TEACHER
        ? <Redirect to={from.pathname} />
        :
        <Switch>
          <PrivateRoute path='/teacher/course/add-lesson' exact>
            <Lesson />
          </PrivateRoute>

          <PrivateRoute path='/teacher/course/add' exact>
            <Add />
          </PrivateRoute>
        </Switch>
      }
    </>
  );
}

export default Content;