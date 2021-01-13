import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Default from './Layouts/Default';
import Admin from './Layouts/Admin';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* login page */}
          <Route path="/login">
            <Login />
          </Route>

          {/* Admin */}
          <Route path="/admin/:path?" exact>
            <Admin />
          </Route>

          {/* default */}
          <Route>
            <Default />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
