import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Default from './layouts/Default';
import Admin from './layouts/Admin';
import Teacher from './layouts/Teacher';
import Login from './pages/Login';
import Register from './pages/Register';

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

            <Route path='/register'>
              <Register />
            </Route>

            {/* Admin */}
            <Route path="/admin">
              <Admin />
            </Route>

            {/* Teach */}
            <Route path="/teacher">
              <Teacher />
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
