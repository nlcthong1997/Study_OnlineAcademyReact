import React, { useReducer } from 'react';
import Course from './components/Course';

const Home = () => {
  const courses = useReducer();
  return ( 
    <>
      {
        courses.map(c => <Course course={c} />)
      }
    </>
  );
}
 
export default Home;