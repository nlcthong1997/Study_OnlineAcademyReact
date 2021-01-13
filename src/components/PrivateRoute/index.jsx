import React from 'react';
import { Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {

  const renderChildren = ({ location }) => {

  }

  return (
    <Route {...rest} render={renderChildren} />
  );
}

export default PrivateRoute;