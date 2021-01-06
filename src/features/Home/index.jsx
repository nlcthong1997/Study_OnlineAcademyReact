import React, { useContext } from 'react';
import Course from './components/Course';
import AppContext from '../../AppContext';

const Home = () => {
  const { store } = useContext(AppContext);
  return ( 
    <>
      {
        store.courses.map((c, i) => <Course key={i} course={c} />)
      }
    </>
  );
}
 
export default Home;