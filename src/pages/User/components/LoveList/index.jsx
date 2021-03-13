import React, { useEffect, useContext, useState } from 'react';

import Course from '../Course';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { remove } from '../../../../services/lovelist';
import { getLoveList } from '../../../../services/lovelist';
import { alertMessage } from '../../../../utils/common';

const LoveList = () => {
  const { dispatch } = useContext(AppContext);
  const [isSub, setIsSub] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  const [loveIds, setLoveIds] = useState([]);
  const [userCourseStarId, setUserCourseStarId] = useState(null);
  const isExist = userCourses.length > 0;

  useEffect(() => {
    const fetchLoveList = async () => {
      let res = await getLoveList();
      if (res.state) {
        setUserCourses(res.data);
        setLoveIds(res.data.map(item => item.id));
      } else {
        if (res.auth !== undefined && res.auth.authenticated === false) {
          dispatch({
            type: LOGOUT,
            payload: {
              isLogged: false
            }
          });
        }
      }
    }
    fetchLoveList();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (isSub) {
      const actionSubStar = async () => {
        let res = await remove(userCourseStarId);
        if (mounted) {
          if (res.state) {
            setIsSub(false);
            let newLoveList = loveIds.filter(id => id !== userCourseStarId);
            setLoveIds(newLoveList);
            let newCourses = userCourses.filter(item => item.id !== userCourseStarId);
            setUserCourses(newCourses);
            alertMessage({ type: 'success', message: 'Xóa khỏi danh sách yêu thích thành công' })
          } else {
            setIsSub(false);
            alertMessage({ type: 'error', message: 'Xóa khỏi danh sách yêu thích thất bại' })
            if (res.auth !== undefined && res.auth.authenticated === false) {
              dispatch({
                type: LOGOUT,
                payload: {
                  isLogged: false
                }
              });
            }
          }
        }
      }
      actionSubStar();
    }

    return () => mounted = false;

  }, [isSub, userCourseStarId, loveIds, userCourses])

  const handleClickSubStar = (userCourse) => {
    setUserCourseStarId(userCourse.courses_id);
    setIsSub(true);
  }

  return (
    <>
      { isExist ?
        userCourses.map((userCourse, idx) =>
          <Course key={idx} userCourse={userCourse} onClickSubStart={handleClickSubStar} loveIds={loveIds} />
        )
        :
        <div>Không có khóa học yêu thích nào được thêm</div>
      }
    </>
  );
}

export default LoveList;