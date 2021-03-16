import React, { useContext } from 'react';
import { Switch, Redirect, useLocation } from "react-router-dom";

import AppContext from '../../../../AppContext';
import { ADMIN } from '../../../../AppTypes';

import PrivateRoute from '../../../../components/PrivateRoute';

import Students from "../../../../pages/Admin/components/Students";
import Teachers from "../../../../pages/Admin/components/Teachers";
import Courses from "../../../../pages/Admin/components/Courses";
import Categories from "../../../../pages/Admin/components/Categories";
import CreateTeacher from "../../../../pages/Admin/components/CreateTeacher";
import CreateCategory from "../../../../pages/Admin/components/CreateCategory";
import ResetPassword from '../../../../pages/Admin/components/ResetPassword';

const Content = () => {
  const { store } = useContext(AppContext);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/login' } };
  return (
    <>
      {store.role !== ADMIN
        ? <Redirect to={from.pathname} />
        :
        <Switch>
          <PrivateRoute path='/admin/students' exact>
            <Students />
          </PrivateRoute>

          <PrivateRoute path='/admin/categories' exact>
            <Categories />
          </PrivateRoute>

          <PrivateRoute path='/admin/teachers' exact>
            <Teachers />
          </PrivateRoute>

          <PrivateRoute path='/admin/courses' exact>
            <Courses />
          </PrivateRoute>

          <PrivateRoute path='/admin/teachers/add' exact>
            <CreateTeacher />
          </PrivateRoute>

          <PrivateRoute path='/admin/categories/add' exact>
            <CreateCategory />
          </PrivateRoute>

          <PrivateRoute path='/admin/teachers/reset-password' exact>
            <ResetPassword />
          </PrivateRoute>

        </Switch>
      }
    </>
  );
}

export default Content;