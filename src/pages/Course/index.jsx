import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from "react-router-dom";

import { getCourseById } from '../../services/course';

import Swal from 'sweetalert2';

const Course = () => {
  let { courseId } = useParams();
  let [course, setCourse] = useState({});
  let [feedbacks, setFeedbacks] = useState([]);
  let [recommend, setRecommend] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    const fetchData = async () => {
      let res = await getCourseById(courseId);
      if (res.error) {
        Swal.fire({
          title: 'Cảnh báo',
          text: 'Khóa học không tồn tại!',
          icon: 'warning',
          confirmButtonText: 'CLOSE'
        });
        history.replace(from);
      } else {
        setCourse(res.course);
        setFeedbacks(res.feedbacks);
        setRecommend(res.recommend);
      }
    }
    fetchData();
  }, []);
  console.log('course: ', course);
  console.log('feedbacks: ', feedbacks);
  console.log('recommend: ', recommend);
  return (
    <></>
  );
}

export default Course;