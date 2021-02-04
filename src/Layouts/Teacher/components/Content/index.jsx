import React, { useContext } from 'react';
import { Switch, Redirect, useLocation } from "react-router-dom";

import AppContext from '../../../../AppContext';
import { TEACHER } from '../../../../AppTypes';

import PrivateRoute from '../../../../components/PrivateRoute';
import Info from '../../../../pages/Teacher/components/Info';
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
          <PrivateRoute path='/teacher' exact>
            <Info />
          </PrivateRoute>

          <PrivateRoute path='/teacher/add-course' exact>
            <Add />
          </PrivateRoute>
        </Switch>
      }
    </>
  );
}

export default Content;