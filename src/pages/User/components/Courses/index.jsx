import React, { useEffect, useContext, useState } from 'react';
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { getUserCourses } from '../../../../services/course';

const Courses = () => {
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
        userCourses.map((course, idx) =>
          <Row key={idx}>
            <Col lg={10}>
              <Media>
                <img
                  width={64}
                  height={64}
                  className="align-self-start mr-3"
                  src="holder.js/64x64"
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>{course.name}</h5>
                  <p>
                    Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
                    leo. Cum sociis natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus.
            </p>
                </Media.Body>
              </Media>
            </Col>
            <Col lg={2}>

            </Col>
          </Row >
        )
        :
        <div>Không có dữ liệu</div>
      }
    </>
  );
}

export default Courses;