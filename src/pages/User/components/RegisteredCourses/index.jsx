import React, { useEffect, useContext, useState } from 'react';

import Course from '../Course';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { getUserCourses } from '../../../../services/course';

const RegisteredCourses = () => {
  const { dispatch } = useContext(AppContext);
  const [userCourses, setUserCourses] = useState([]);
  const isExist = userCourses.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      let result = await getUserCourses();
      if (result.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
      } else {
        setUserCourses(result)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      { isExist ?
        userCourses.map((userCourse, idx) =>
          <Course key={idx} userCourse={userCourse} />
        )
        :
        <div>Không có dữ liệu</div>
      }
    </>
  );
}

export default RegisteredCourses;