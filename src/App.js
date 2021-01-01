import { useEffect, useState } from 'react';
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
      <Header categories={categories} courses={courses} />
      <Main />
    </div>
  );
}

export default App;
