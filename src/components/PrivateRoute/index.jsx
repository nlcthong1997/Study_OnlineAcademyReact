import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";

import AppContext from '../../AppContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { store } = useContext(AppContext);
  const renderChildren = ({ location }) => {
    return store.isLogged
      ? children
      : <Redirect>
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      </Redirect>
  }

  return (
    <Route {...rest} render={renderChildren} />
  );
}

export default PrivateRoute;