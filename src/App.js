import React, { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';

import AppContext from './AppContext';
import reducer from './AppReducer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const initialState = {
    categories: [],
    courses: []
  }

  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(()=> {
    const fetchData = async () => {
      // let rsHighlights = await fetch('http://localhost:3000/api/courses/highlights-last-week');
      // let rsJsonHighlights = await rsHighlights.json();

      // let rsMostView = await fetch('http://localhost:3000/api/courses/most-view');
      // let rsJsonMostView = await rsMostView.json();

      // let rsCourses = await fetch('http://localhost:3000/api/courses');
      // let rsJsonCourses = await rsCourses.json();

      let jsonCategories = await fetch('http://localhost:3000/api/categories');
      let categories = await jsonCategories.json();

      dispatch({
        type: 'init',
        payload: {
          categories
        }
      });
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <AppContext.Provider value={ {store, dispatch} }>
        <Router>
          <Switch>
            {/* login page */}
            <Route path="/login">
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
