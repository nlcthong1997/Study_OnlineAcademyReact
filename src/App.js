import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Default from './Layouts/Default';
import Admin from './Layouts/Admin';
import Login from './pages/Login';

import reducer from './AppReducer';
import AppContext from './AppContext';
import { initialState } from './AppState';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <AppContext.Provider value={{ store, dispatch }}>
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
      </AppContext.Provider>
    </div >
  );
}

export default App;
