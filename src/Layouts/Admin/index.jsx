import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin" exact>
        <h1>Admin</h1>
      </Route>
      <Route path='/admin/setting'>
        <h1>Amin setting</h1>
      </Route>
    </Switch>
  );
}

export default Admin;