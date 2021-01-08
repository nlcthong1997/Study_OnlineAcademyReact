import React, { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';

import AppContext from './AppContext';
import reducer from './AppReducer';
import { INIT_HOME } from './AppTypes';
import { getInitCourses } from './services/course';
import { getInitCategories } from './services/category';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const initialState = {
    categories: [],
    courses: [],
    isShowAll: true
  }

  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      let categories = await getInitCategories();
      let courses = await getInitCourses();

      dispatch({
        type: INIT_HOME,
        payload: {
          categories,
          courses
        }
      });
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <AppContext.Provider value={{ store, dispatch }}>
        <Router>
          <Switch>
            {/* login page */}
            <Route path="/login">
              <Header />
              <h1>Login</h1>
            </Route>

            {/* Admin */}
            <Route path="/admin/:path?" exact>
              <Switch>
                <Route path="/admin" exact>
                  <h1>Admin</h1>
                </Route>
                <Route path='/admin/setting'>
                  <h1>Amin setting</h1>
                </Route>
              </Switch>
            </Route>

            {/* default */}
            <Route>
              <Header />
              <Main />
            </Route>

          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
