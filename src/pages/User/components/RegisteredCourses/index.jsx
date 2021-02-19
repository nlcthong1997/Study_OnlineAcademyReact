import React, { useEffect, useContext, useState } from 'react';

import Course from '../Course';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { getUserCourses } from '../../../../services/course';
import { create, remove } from '../../../../services/lovelist';
import { getLoveList } from '../../../../services/lovelist';
import { alertMessage } from '../../../../utils/common';

const RegisteredCourses = () => {
  const { dispatch } = useContext(AppContext);
  const [isAdd, setIsAdd] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  const [loveIds, setLoveIds] = useState([]);
  const isExist = userCourses.length > 0;
  const [userCourseStarId, setUserCourseStarId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      let result = await getUserCourses();
      if (result.state) {
        setUserCourses(result.data)
      } else {
        if (result.auth !== undefined && result.auth.authenticated === false) {
          dispatch({
            type: LOGOUT,
            payload: {
              isLogged: false
            }
          });
        }
      }
    }
    fetchData();

    const fetchLoveList = async () => {
      let res = await getLoveList();
      if (res.state) {
        let ids = res.data.reduce((prev, cur) => {
          prev.push(cur.courses_id);
          return prev;
        }, [])
        setLoveIds(ids);
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
    if (isAdd) {
      const actionAddStar = async () => {
        let res = await create(userCourseStarId);
        if (mounted) {
          if (res.state) {
            setIsAdd(false);
            setLoveIds([...loveIds, userCourseStarId]);
            alertMessage({ type: 'success', message: 'Thêm vào danh sách yêu thích thành công' })
          } else {
            setIsAdd(false);
            alertMessage({ type: 'error', message: 'Thêm vào danh sách yêu thích thất bại' })
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
      actionAddStar();
    }

    return () => mounted = false;
  }, [isAdd, userCourseStarId, loveIds]);


  useEffect(() => {
    let mounted = true;
    if (isSub) {
      const actionSubStar = async () => {
        let res = await remove(userCourseStarId);
        if (mounted) {
          if (res.state) {
            setIsSub(false);
            let newList = loveIds.filter(id => id !== userCourseStarId)
            setLoveIds(newList);
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

  }, [isSub, userCourseStarId, loveIds])

  const handleClickAddStar = (userCourse) => {
    setUserCourseStarId(userCourse.courses_id);
    setIsAdd(true);
  }

  const handleClickSubStar = (userCourse) => {
    setUserCourseStarId(userCourse.courses_id);
    setIsSub(true);
  }

  return (
    <>
      { isExist ?
        userCourses.map((userCourse, idx) =>
          <Course key={idx} userCourse={userCourse} onClickAddStart={handleClickAddStar} onClickSubStart={handleClickSubStar} loveIds={loveIds} />
        )
        :
        <div>Bạn chưa chưa mua bất kì khóa học nào</div>
      }
    </>
  );
}

export default RegisteredCourses;