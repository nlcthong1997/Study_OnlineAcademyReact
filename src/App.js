import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(()=> {
    
  }, [])

  return (
    <div className="App">
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
            <Header categories={categories} courses={courses} />
            <Main />
          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
