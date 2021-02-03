import React, { useContext } from 'react';
import { Switch, Redirect, useLocation } from "react-router-dom";

import AppContext from '../../../../AppContext';
import { TEACHER } from '../../../../AppTypes';

import PrivateRoute from '../../../../components/PrivateRoute';
import Teacherr from '../../../../pages/Teacherr';

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
          <PrivateRoute path='/teacher' exact>
            <Teacherr />
          </PrivateRoute>
        </Switch>
      }
    </>
  );
}

export default Content;